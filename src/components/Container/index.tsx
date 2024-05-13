import './index.sass';

type Props = {
    children: any;
    className?: string;
};

function Container(props: Props) {
    return <div className={props.className}><div className="container">{props.children}</div></div>;
}

export default Container;