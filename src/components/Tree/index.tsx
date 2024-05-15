import './index.sass';

type Props = {
    items: any;
    onClickPlus: (parent_id: Number) => any;
    className?: string;
    isError?: boolean;
    errorText?: string;
};

function Tree(props: Props) {
    return (
        <div className={props.className}>
            {props.isError && <div className='error'>{props.errorText}</div>}
            {props.items.map(item =>
                <div className="pages__block">
                    <div className="pages__title">{item.title}</div>
                    <div className="pages__add" onClick={
                        () => props.onClickPlus(item.id)
                    }>
                        +
                    </div>
                    <div className="pages__slug">{item.slug}</div>
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