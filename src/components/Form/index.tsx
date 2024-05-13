import './index.sass';

type Props = {
    onSubmit: any;
    children: any;
    className?: string;
};

export function Form(props: Props) {
    return <form onSubmit={props.onSubmit} className={props.className}>{props.children}</form>;
}
