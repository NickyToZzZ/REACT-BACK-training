import './tabs.css';
import { ITabs } from './ITabs';

export default function Tabs({text1,text2, text3, tabClassName, isDisabled, clickFunction}: ITabs) {
    return (
        <>
        <div className="container-tabs">
            <button className={tabClassName} disabled={isDisabled} onClick={clickFunction}>{text1}</button>
            <button className={tabClassName} disabled={isDisabled} onClick={clickFunction}>{text2}</button>
            <button className={tabClassName} disabled={isDisabled} onClick={clickFunction}>{text3}</button>
        </div>
        </>
    )
}
