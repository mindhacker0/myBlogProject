import '../controller.less';
import { Button, InputNumber, message } from "antd";
import { useModel } from '@umijs/max';
import regExp from '@/utils/regExp';
import { useEffect, useState, useRef } from 'react';
import { formatUnit, degreesToRadians, radiansToDegrees, reserveDecimal } from '@/utils/index';
import useOutsideMouseUp from '@/hooks/useOutsideMouseUp';
import { cloneDeep } from 'lodash';

export default function ControllerX() {
    const global = useModel('global');
    const jointPositions: { [key: string]: number | string } = global.robotInfo.jointPositions;
    const [list, setList] = useState<{ [key: string]: any }[]>([]);
    const currentClickButton = useRef<1 | 2 | null>(null);// 记录当前点的哪个按钮 正1反2
    const { ref: straightRef, onMouseLeave: straightOnMouseLeave } = useOutsideMouseUp(() => {
        if (currentClickButton.current !== 1) { return }
        const name = straightRef?.current?.dataset.name;
        // console.log('outside 正', name);
        handleBtnOpt(name, 1, 'stop', 'straightRef onMouseLeave');
        currentClickButton.current = null;
    });
    const { ref: reverseRef, onMouseLeave: reverseOnMouseLeave } = useOutsideMouseUp(() => {
        if (currentClickButton.current !== 2) { return }
        const name = reverseRef?.current?.dataset.name;
        // console.log('outside 反', name);
        handleBtnOpt(name, -1, 'stop', 'reverseRef onMouseLeave');
        currentClickButton.current = null;
    });

    const _formatName = (name: string) => {
        return '关节' + name.replace('J', '')
    }

    const updateListData = (data: { [key: string]: any }, list: { [key: string]: any }[]) => {
        const _list = cloneDeep(list);
        if (!_list.length) {
            return Object.keys(data).map(v => {
                return { name: v, value: data[v], inputValue: '' }
            })
        }
        _list.forEach((item: { [key: string]: any }) => {
            item.value = data[item.name]
        })
        return _list
    }

    useEffect(() => {
        setList(updateListData(jointPositions, list))
    }, [jointPositions]);

    const handleBtnOpt = (item: string, direction: number, type: string, origin: string) => {
        if (origin === 'onMouseUp' && currentClickButton.current === null) {
            return
        }
        const param = {
            "event": type === 'start' ? "jog_start" : 'jog_stop', // 关节点动开始/停止
            "axis": item, //第几个关节
            "direction": direction, //1表示正向，-1表示反向
            "step": 0.5, //每次点动命令中机器人移动的量
            "speed": 50, //机器人移动的速率
        }
        global.socketSend(param)
    }

    const update = (item: string, val: string, idx: number) => {
        if (!_valid(idx)) {
            return
        }

        const param = {
            "event": "update",
            "jointPositions": {
                ...jointPositions,
                [item]: parseFloat(val)
            },
        }
        global.socketSend(param)
    }

    const _valid = (idx?: number) => {
        console.log('_vald', list)
        let i = 0;
        let len = list.length;
        if (typeof idx === 'number') {
            i = idx;
            len = idx + 1
        }
        const reg = regExp.float;
        for (i; i < len; i++) {
            const val = String(list[i].inputValue);
            const key = list[i].name;
            console.log(key, val, getMax(key), getMin(key))
            if (val && !reg.test(String(val))) {
                message.error('请输入数字, 最大支持两位小数');
                return
            }
            if (Number(val) > getMax(key)) {
                message.error('超出最大限制');
                return
            }
            if (Number(val) < getMin(key)) {
                message.error('未达到最小限制');
                return
            }
        }
        return true
    }

    const onChange = (item: string, val: string | number | null, idx: number) => {
        // console.log('val', val)
        const _list = cloneDeep(list);
        _list[idx].inputValue = typeof val === 'undefined' || typeof val === null ? '' : val;
        setList(_list)
    }

    const submit = () => {
        if (!_valid()) {
            return
        }
        const _form: { [key: string]: string | number } = {}
        list.forEach(v => {
            _form[v.name] = v.inputValue || v.value
        })
        const param = {
            "event": "update",
            "jointPositions": _form,
        }
        global.socketSend(param)
    }

    const getMin = (key: string) => {
        if (global.originJoints) {
            const _val = global.originJoints[key]['limit']['lower'];
            return key === 'J4' ? _val * 1000 : _val === -3.14 ? -180 : radiansToDegrees(_val)
        }
        return -180
    }

    const getMax = (key: string) => {
        if (global.originJoints) {
            const _val = global.originJoints[key]['limit']['upper'];
            return key === 'J4' ? _val * 1000 : _val === 3.14 ? 180 : radiansToDegrees(_val)
        }
        return 180
    }

    return (
        <div className="controller" style={{ width: 520 }}>
            {
                list.map((item, idx) => <div className="row" key={idx}>
                    <div className="label">{_formatName(item.name)}</div>
                    <div className="btns">
                        <div className="btn-item">
                            <Button
                                ref={straightRef}
                                data-name={item.name}
                                onMouseDown={() => {
                                    currentClickButton.current = 1;
                                    handleBtnOpt(item.name, 1, 'start', 'onMouseDown')
                                }}
                                onMouseUp={() => handleBtnOpt(item.name, 1, 'stop', 'onMouseUp')}
                                onMouseLeave={straightOnMouseLeave}
                            >
                                正向点动
                            </Button>
                        </div>
                        <div className="btn-item">
                            <Button
                                onMouseDown={() => {
                                    currentClickButton.current = 2;
                                    handleBtnOpt(item.name, -1, 'start', 'onMouseDown')
                                }}
                                onMouseUp={() => handleBtnOpt(item.name, -1, 'stop', 'onMouseUp')}
                                onMouseLeave={reverseOnMouseLeave}
                                ref={reverseRef}
                                data-name={item.name}
                            >
                                负向点动
                            </Button>
                        </div>
                    </div>
                    <div className="input">
                        <InputNumber className="input-sty" placeholder="回车确定"
                            min={getMin(item.name)}
                            max={getMax(item.name)}
                            // 这里其实不需要做成受控组件
                            // value={item.inputValue}
                            onChange={(val) => onChange(item.name, val, idx)}
                            onPressEnter={(e) => update(item.name, (e.target as HTMLInputElement).value, idx)}
                        />
                    </div>
                    <div className="value" style={{ minWidth: 60 }}>{reserveDecimal(item.value)}</div>
                    <div className="unit">（
                        {global.originJoints ?
                            formatUnit(global.originJoints[item.name].jointType)
                            : null
                        }）
                    </div>
                </div>)
            }
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <Button type="primary" onClick={() => submit()}>确定</Button>
            </div>
        </div>
    );
}