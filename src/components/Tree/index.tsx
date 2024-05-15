import { useEffect, useState } from 'react';
import './index.sass';

type Props = {
    items: any;
    onClickPlus: (parent_id: Number) => any;
    className?: string;
    isError?: boolean;
    errorText?: string;
};

function Tree(props: Props) {
    const [itemsFull, setItemsFull] = useState([]);
    let itemsRoot: any = []
    useEffect(() => {
        debugger
        let itemsMap: any = {};
        for (let i = 0; i < props.items.length; i++) {
            itemsMap[props.items[i].id] = props.items[i];
        }
        console.log(props.items);
        const up = (id: Number, child_id: Number) => {
            if (itemsMap[child_id as any]?.used) return
            itemsMap[child_id as any].used = true;

            if (!itemsMap[id as any].children) {
                itemsMap[id as any].children = [itemsMap[child_id as any]]
            } else {
                itemsMap[id as any].children.push(itemsMap[child_id as any])
            }
            if (itemsMap[id as any]?.used) return
            if (itemsMap[id as any].parent_id == -1) {
                itemsRoot.push(itemsMap[id as any])
            } else {
                up(itemsMap[id as any].parent_id, id)
            }
        }
        for (let j = 0; j < props.items.length; j++) {
            if (props.items[j].parent_id == -1) {
                itemsMap[props.items[j].id as any].used = true;
                itemsRoot.push(props.items[j])
                continue
            } else {
                up(props.items[j].parent_id, props.items[j].id)
            }

        }
        console.log(itemsRoot);
        setItemsFull(itemsRoot);
    }, [props.items])

    return (
        <div className={props.className}>
            {props.isError && <div className='error'>{props.errorText}</div>}
            {itemsFull.map(item =>
                <div>
                    <div className="pages__block">
                        <div className="pages__title">{item.title}</div>
                        <div className="pages__add" onClick={
                            () => props.onClickPlus(item.id)
                        }>
                            +
                        </div>
                        <div className="pages__slug">{item.slug}</div>
                    </div>
                    {item?.children?.map(item2 =>
                        <div>
                            <div className="pages__block in">
                            <div className="pages__title">{item2.title}</div>
                            <div className="pages__add" onClick={
                                () => props.onClickPlus(item2.id)
                            }>
                                +
                            </div>
                            <div className="pages__slug">{item2.slug}</div>
                        </div>
                        {item2?.children?.map(item3 =>
                                <div className="pages__block in2">
                                    <div className="pages__title">{item3.title}</div>
                                    <div className="pages__add" onClick={
                                        () => props.onClickPlus(item3.id)
                                    }>
                                        +
                                    </div>
                                    <div className="pages__slug">{item3.slug}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            <div className="pages__new" onClick={
                () => props.onClickPlus(-1)
            }>
                + Новая страница в корне
            </div>
        </div>
    );
}

export default Tree;