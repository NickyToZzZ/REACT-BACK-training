import './title.css';

export default function Title({text}: {text: string}) {
    return (
        <>
        <div className="container">
            <div className="container__title">{text}</div>
        </div>
        </>
     )
}
