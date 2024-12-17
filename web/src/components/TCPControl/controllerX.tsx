import '../controller.less';
import { InputNumber, message, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { useModel } from '@umijs/max';
import regExp from '@/utils/regExp';
import { formatUnit, capitalizeFirstLetter, reserveDecimal } from '@/utils/index';
import { cloneDeep } from 'lodash';
import useOutsideMouseUp from '@/hooks/useOutsideMouseUp';

export default function ControllerX() {

    const global = useModel('global');
    const robotInfo = global.robotInfo;
    const pose : { [k : string]: number | string } = robotInfo.pose;
    const [list, setList] = useState<{[key: string]: any}[]>([]);
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

    const updateListData = (data: { [key: string]: any }, list: {[key: string]: any}[]) => {
        const _list = cloneDeep(list);
        if (!_list.length) {
            return Object.keys(data).map(v => {
                return { name: v, value: data[v], inputValue: '' }
            })
        }
        _list.forEach((item: {[key: string]: any}) => {
            item.value = data[item.name]
        })
        return _list
    }

    useEffect(() => {
        setList(updateListData(pose, list))
    }, [pose]);

    const handleBtnOpt = (item: string, direction: number, type: string, origin: string) => {
        if (origin === 'onMouseUp' && currentClickButton.current === null) {
            return
        }
        const param : {
            event: string
            movement?: {
                [key: string]: string | number
            }
            speed?: number
        } = {
            "event": type === 'start' ? "cartesian_jog_start" : 'cartesian_jog_stop', // 关节点动开始/停止
        }
        if (type === 'start') {
            const val = direction > 0 ? 0.1 : -1;
            param.movement = {
                ...pose,
                [item]: val
            }
            param.speed = 50
        }
        global.socketSend(param)
    }

    const _valid = (idx?: number) => {
        let i = 0;
        let len = list.length;
        const hasIdx = typeof idx === 'number';
        if (hasIdx) {
            i = idx;
            len = idx + 1
        }
        const reg = regExp.float;
        for (i; i < len; i++) {
            const val = String(list[i].inputValue);
            if (!!val && !reg.test(val)) {
                message.error('请输入数字, 最大支持两位小数');
                return false
            }
            const y = hasIdx ? idx : i;
            if (list[y] && !['x', 'y', 'z'].includes(list[y].name)) {
                // 度数校验-180~180
                const _max = 180, _min = -180;
                if (Number(val) > _max || Number(val) < _min) {
                    message.error(`[${list[y].name}] 输入值范围是${_min}~${_max}`);
                    return false
                }
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

    const update = (item: string, val: string, idx: number) => {
        if (!_valid(idx)) {
            return
        }
        const param = {
            "event": "update", 
            "pose": {
                ...robotInfo.pose,
                [item]: parseFloat(val)
            },
        }
        global.socketSend(param)
    }

    const submit = () => {
        if (!_valid()) {
            return
        }
        const _form : {[key: string]: string | number} = {}
        list.forEach(v => {
            _form[v.name] = v.inputValue || v.value
        })
        const param = {
            "event": "update", 
            "pose": _form,
        }
        global.socketSend(param)
    }

    return (
        <div className="controller" style={{ width: 380 }}>
            {list.map((item, idx) => <div className="row" key={idx}>
                <div className="label">{capitalizeFirstLetter(item.name)}</div>
                <div className="btns">
                    <div className="btn-item">
                        <PlusCircleOutlined
                            ref={straightRef}
                            data-name={item.name}
                            onMouseDown={() => {
                                currentClickButton.current = 1;
                                handleBtnOpt(item.name, 1, 'start', 'onMouseDown')
                            }}
                            onMouseUp={() => handleBtnOpt(item.name, 1, 'stop', 'onMouseUp')}
                            onMouseLeave={straightOnMouseLeave}
                        />
                    </div>
                    <div className="btn-item">
                        <MinusCircleOutlined
                            onMouseDown={() => {
                                currentClickButton.current = 2;
                                handleBtnOpt(item.name, -1, 'start', 'onMouseDown')
                            }}
                            onMouseUp={() => handleBtnOpt(item.name, -1, 'stop', 'onMouseUp')}
                            onMouseLeave={reverseOnMouseLeave}
                            ref={reverseRef}
                            data-name={item.name}
                        />
                    </div>
                </div>
                <div className="input">
                    <InputNumber className="input-sty" placeholder="回车确定"
                        // 这里其实不需要做成受控组件
                        // value={item.inputValue}
                        onPressEnter={(e) => update(item.name, (e.target as HTMLInputElement).value, idx)}
                        onChange={(val) => onChange(item.name, val, idx)}
                    />
                </div>
                <div className="value" style={{ minWidth: 60 }}>{reserveDecimal(item.value)}</div>
                <div className="unit">（{ formatUnit(['x', 'y', 'z'].includes(item.name) ? 'prismatic' : 'revolute') }）</div>
            </div>)}
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <Button type="primary" onClick={() => submit()}>确定</Button>
            </div>
        </div>
    );
  }