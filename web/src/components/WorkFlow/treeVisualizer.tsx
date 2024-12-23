import './treeVisualizer.less';
import React, { useState, useRef, useEffect, useContext, FC } from "react";
import { message as messageApi, Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

// import { parse } from "../behavior-tree/parse";
// import { layout } from "../behavior-tree/layout";
// import BehaviorTreeView from "../behavior-tree/views/BehaviorTreeView";
// import { examples } from "../behavior-tree/utils/examples";

// const unpositioned = parse(examples.sortingLunch);
// const positioned = layout.dagre(unpositioned);
// console.log('unpositioned', unpositioned)
// console.log('positioned', positioned)

import { State, BehaviourTree, convertMDSLToJSON, validateDefinition, BehaviourTreeOptions, NodeDetails } from "mistreevous";
import { NodeType, ConnectorType } from "../../types/workflo";
import { MainPanel } from '../MainPanel';

import eventBus from '@/common/eventBus';
import { Pose, JointPositions, RobotInfo } from '@/types/robot';
import { RootNodeDefinition } from 'mistreevous/dist/BehaviourTreeDefinition';
import { EditorContext } from '../LowCodeEditor/editorContext';

export type CanvasElements = { nodes: NodeType[], edges: ConnectorType[] };

const { confirm } = Modal;


const showConfirm = () => {
  return new Promise((reslove, reject) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        reslove(true)
      },
      onCancel() {
        reslove(false)
      },
    });
  });

};

// 创建canvas元素
const _createCanvasElements = (rootNodeDetails: NodeDetails): CanvasElements => {
  let result: CanvasElements = { nodes: [], edges: [] };

  const processNodeDetails = (node: NodeDetails, parentId?: string) => {
    result.nodes.push({
      id: node.id,
      caption: node.name,
      state: node.state,
      type: node.type,
      args: node.args ?? [],
      whileGuard: node.while,
      untilGuard: node.until,
      entryCallback: node.entry,
      stepCallback: node.step,
      exitCallback: node.exit,
      variant: "default"
    } as any);

    if (parentId) {
      let variant;

      switch (node.state) {
        case State.RUNNING:
          variant = "active";
          break;

        case State.SUCCEEDED:
          variant = "succeeded";
          break;

        case State.FAILED:
          variant = "failed";
          break;

        default:
          variant = "default";
      }

      result.edges.push({
        id: `${parentId}_${node.id}`,
        from: parentId,
        to: node.id,
        variant
      });
    }

    (node.children ?? []).forEach((child) => processNodeDetails(child, node.id));
  };

  processNodeDetails(rootNodeDetails);

  return result;
}


const TreeVisualizer:React.FC<{style?:React.CSSProperties;}> = (props)=>{
  const {socketSend} = useContext(EditorContext);

  // layoutId: string | null;
  // activeSidebarTab: SidebarTab;
  // definition: string;
  // definitionType: DefinitionType;
  // agent: string;
  // agentExceptionMessage: string;
  // behaviourTree: BehaviourTree | null;
  // behaviourTreeExceptionMessage: string;
  // behaviourTreePlayInterval: NodeJS.Timer | null;
  // canvasElements: CanvasElements;

  const [behaviourTree, setBehaviourTree] = useState<BehaviourTree | null>(null);
  const behaviourTreePlayInterval = useRef<NodeJS.Timeout | null>(null);
  const [canvasElements, setCanvasElements] = useState<CanvasElements | null>(null);
  const [layoutId, setLayoutId] = useState<string | null>(null);
  const form = useRef<Pose | JointPositions | null>(null);

  const clearBehaviourTreePlayInterval = () => {
    if (behaviourTreePlayInterval.current !== null) {
      clearInterval(behaviourTreePlayInterval.current);
    }
    behaviourTreePlayInterval.current = null;
  }

  // moveP 检测函数
  const moveCheckCbs = (data: RobotInfo, type: 'pose' | 'jointPositions') : 'success' | 'moving' | 'fail' | null => {
    console.log('moveCheckCbs, robotInfoChange>', data)
    // 1这个任务是异步的，只有当检查到机器人确实到了B点（每个维度的误差 <= 0.01），
    // 2且机器人的isMoving字段为false，才resolve(State.SUCCEEDED)。
    // 3当机器人的isMoving字段的false，但没到B点，则：resolve(State.FAILED)
    if (!data) {
      return null
    }
    const _comparison = () => {
      if (form.current === null) {
        return false
      }
      for (let k in data[type]) {
        if (Math.abs(Number(form.current[k]) - Number(data[type][k])) > 0.01) {
          return false
        }
      }
      return true
    }
    if (data.isMoving === false && _comparison()) { // && 判断条件1
      return 'success'
    } else if (data.isMoving === false && !_comparison()) { // && 判断条件3
      return 'fail'
    } else {
      return 'moving'
    }
  }

  // 行为树的节点运行回调
  class Agent {
    [key: string]: any;
    
    MoveP(pose: string) {
      messageApi.info("MoveP: " + pose)
      // console.log('moveP', validateDefinition(pose))
      // return new Promise(function (resolve, reject) {
      //   setTimeout(() => {
      //     resolve(State.SUCCEEDED)
      //   }, 1000)
      // })
      // 发送更新末端指令给后端
      const param = {
        "event": "update",
        "pose": JSON.parse(pose),
      }
      // 保存param到form
      form.current = param.pose;
      socketSend(param);

      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          const handler = (data: RobotInfo) => {
            const _result = moveCheckCbs(data, 'pose');      
            console.log("MoveP result", _result);
                
            if (_result === 'success') {
              resolve(State.SUCCEEDED)
              eventBus.off('robotInfoChange', handler)
            } else if (_result === 'fail') {
              resolve(State.FAILED)
              eventBus.off('robotInfoChange', handler)
            }
          };
          eventBus.on('robotInfoChange', handler)
        }, 1000)
        
      });
    }
    confirm() {
      return window.confirm(`是否继续?`);
      // return showConfirm()
    }
    succeed() {
      messageApi.info("成功执行完毕")
      return State.SUCCEEDED
    }
    MoveJ(jointPositions: string) {
      messageApi.info("MoveJ: " + jointPositions)
      // 发送更新关节指令给后端
      const param = {
        "event": "update",
        "jointPositions": JSON.parse(jointPositions),
      }
      // 保存param到form
      form.current = param.jointPositions;
      socketSend(param);

      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          const handler = (data: RobotInfo) => {
            const _result = moveCheckCbs(data, 'jointPositions');      
            console.log("MoveJ result", _result);
                
            if (_result === 'success') {
              resolve(State.SUCCEEDED)
              eventBus.off('robotInfoChange', handler)
            } else if (_result === 'fail') {
              resolve(State.FAILED)
              eventBus.off('robotInfoChange', handler)
            }
          };
          eventBus.on('robotInfoChange', handler)
        }, 1000)
        
      });
    }
  }

  const definition:RootNodeDefinition = {
    "type": "root",
    "child": {
      "type": "sequence",
      "children": [

        {
          "type": "action",
          "call": "MoveP",
          "args": [
            '{"x":0,"y":0,"z":1672.50,"roll":0,"pitch":0,"yaw":0}'
            // 'action [MoveP, "x:1, y:1, z:1, roll:1"]'
          ]
        },
        {
          "type": "condition",
          "call": "confirm",
          "args": []
        },
        {
          "type": "action",
          "call": "MoveP",
          "args": [
            '{"x":-141.55,"y":-14.52,"z":1659.43,"roll":-0.3,"pitch":-16.64,"yaw":8.74}'
          ]
        },
        // {
        //   "type": "action",
        //   "call": "MoveJ",
        //   "args": [
        //     '{"J1":30,"J2":4.78,"J3":-1.67,"J4":-1.59,"J5":0.21,"J6":1.6}'
        //   ]
        // },
        {
          "type": "succeed",
          "child": {
              "type": "action",
              "call": "succeed",
              "args": []
          }
        },
      ]
    }
  }

  // 创建实例
  const _createTreeInstance = () => {

    const options: BehaviourTreeOptions = {
      // We are calling step() every 100ms in this class so a delta of 0.1 should match what we expect.
      getDeltaTime: () => 0.1
    };

    console.log('创建实例', definition, options)

    const ins = new BehaviourTree(definition, new Agent(), options);

    return ins
  }

  const _onPlayButtonPressed = (ins: BehaviourTree | null): void => {
    console.log('_onPlayButtonPressed-->', ins)

    // There is nothing to de if we have no behaviour tree instance.
    if (!ins) {
      return;
    }

    // Reset the tree.
    ins.reset();

    // Clear any existing interval.
    clearBehaviourTreePlayInterval();

    // Create an interval to step the tree until it is finished.
    behaviourTreePlayInterval.current = setInterval(() => {
      // Step the behaviour tree, if anything goes wrong we will stop the tree playback.
      try {
        ins.step();
      } catch (exception: any) {
        // Clear the interval.
        clearBehaviourTreePlayInterval();

        // Reset the tree.
        ins.reset();

        // Notify the user of the exception via a toast.
        console.log('error--->', exception)
        messageApi.error(exception.toString());
      }

      // If the tree root is in a finished state then stop the interval.
      if (!ins.isRunning()) {
        // Clear the interval.
        clearBehaviourTreePlayInterval();
      }
      // console.log('test1---', ins.getTreeNodeDetails())
      // console.log('test2---', _createCanvasElements(ins.getTreeNodeDetails()))
      setCanvasElements(_createCanvasElements(ins.getTreeNodeDetails()))
    }, 100) as unknown as NodeJS.Timeout;

  }

  const _onStopButtonPressed = (): void => {
    if (!behaviourTree) return;

    behaviourTree?.reset();

    clearBehaviourTreePlayInterval();

    setCanvasElements(behaviourTree ? _createCanvasElements(behaviourTree.getTreeNodeDetails()) : { nodes: [], edges: [] })
  }


  useEffect(() => {
    console.log('convertMDSLToJSON>', convertMDSLToJSON('root {condition [HasItem, "gold", 500]}'))
    const ins = _createTreeInstance()
    setBehaviourTree(ins);
    setCanvasElements(_createCanvasElements(ins.getTreeNodeDetails()));

    return () => {
      eventBus.off('robotInfoChange', moveCheckCbs)
    }
  }, [])

  useEffect(() => {
    if (behaviourTree) {
      // _onPlayButtonPressed(behaviourTree)
    }
  }, [behaviourTree])



  return (
    <div className="tree-visualizer w-[500px] h-[500px]" style={props?.style}>
      {/* <BehaviorTreeView {...positioned} /> */}

      <MainPanel
        layoutId={layoutId}
        elements={canvasElements}
        showPlayButton={!!behaviourTree && !behaviourTreePlayInterval.current}
        showReplayButton={!!behaviourTreePlayInterval.current}
        showStopButton={!!behaviourTreePlayInterval.current}
        onPlayButtonClick={() => _onPlayButtonPressed(behaviourTree)}
        onReplayButtonClick={() => _onPlayButtonPressed(behaviourTree)}
        onStopButtonClick={() => _onStopButtonPressed()}
      />
    </div>
  );
}

export default TreeVisualizer;
// 节点一：

// 用户点击开始后，发送MoveP移动到B点的任务命令。即：webSocket发送“更新末端位置”的指令，位置为B点位置。

// 这个任务是异步的，只有当检查到机器人确实到了B点（每个维度的误差 <= 0.01），
// 且机器人的isMoving字段为false，才resolve(State.SUCCEEDED)。
// 当机器人的isMoving字段的false，但没到B点，则：resolve(State.FAILED)

// 对于一颗行为树来说，每时每刻，都应该只有一个正在进行的任务。
// 通过不断从websocket接收到的最新的机器人状态，来判断该任务的执行情况。

// 节点二：
// 弹窗，询问用户：“是否继续下一步”

// 给用户两个选项：“继续下一步”，“停止”

// 当用户选择“继续下一步”，返回State.SUCCEEDED
// 当用户选择“停止”，返回State.FAILED

// 节点三：
// 发送MoveJ的任务命令，即：webSocket发送“更新关节位置”的指令。

// 第三个节点的整体逻辑，和第一个节点一致。

// 这三个节点的级联方式，是一个"sequence"。
// sequence的特点，是逐个执行，且只有当节点成功时，才继续往下一个节点走；任一节点失败，则不再继续往前走，
// 整个任务失败；直到所有节点都成功，整个任务才成功。

  // new (new Function("BehaviourTree","State","getStringValue","getNumberValue","getBooleanValue","showErrorToast","showInfoToast","return ".concat(e, ";"))(f.BehaviourTree, f.State, (function(e) {
  //     return window.prompt(e)
  // }
  // ), (function(e) {
  //     return parseFloat(window.prompt(e))
  // }
  // ), (function(e) {
  //     return window.confirm("".concat(e, ". (Ok=true Cancel=false)"))
  // }
  // ), (function(e) {
  //     return ne.error(e)
  // }
  // ), (function(e) {
  //     return ne.info(e)
  // }
  // )))