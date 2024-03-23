import './Task.css';
import { useEffect, useState } from 'react';

export default function Task({
         isChecked,
         id,
         title,
         onDelete,
         onChange,
         date,
         price,
        onChangePrice
}: {isChecked: boolean, id: string, title: string, onDelete: (id: string) => void, onChange: (id: string, isCompleted:boolean) => void, date: number, price: number, onChangePrice: (id:string, price: number) => void}) {

    return (
        <div className="content-card">
            <input className="content-card__checkbox" type="checkbox" checked={isChecked} onChange={() => onChange(id, !isChecked)}/>
            <h2 className="content-card__title">{title}</h2>
            <button className="content-card__btn" type="button" onClick={() => onDelete(id)}>X</button>
            <div className="content-card__date">{new Date(date).toISOString()}</div>
            <input type="text" value={price} onChange={(e) => onChangePrice(id, Number(e.target.value))}/>
        </div>
    )
}
