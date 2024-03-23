import './Index.css';
import Task from './components/Task/Task';
import Bitcoin from './components/Bitcoin/Bitcoin';
import Register from './components/Register/Register';
import { v4 as uuidv4 } from 'uuid';

import { useEffect, useState } from 'react';

export default function Index() {

    useEffect(() => {
        getApiFactCat();
    }, [])


    const [title, setTitle] = useState<string>('');
    const [tasks, setTasks] = useState<{id: string, title: string, isCompleted: boolean, date: number, price: number}[]>([]);
    const [price, setPrice] = useState<number>(0)
    const [fact,setFact] = useState<string>('');

    const addTask = (title: string, price: number) => {
        if(!title || !price) {
            alert('Title or price are empty');
            return;
        }
        const newTask = {
            id: uuidv4(),
            title,
            isCompleted: false,
            date: Date.now(),
            price
        };

        setTasks([...tasks, newTask])
        setTitle('');
        setPrice(0)
    }

    const countCompletedTasks = tasks.reduce((sum, task) => {
        return sum + (task.isCompleted ? 1 : 0);
    }, 0);

    const calcTotalPrise = tasks.reduce((calc, e) => {
        return calc + e.price
    }, 0)

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((task) => {
            return task.id !== id
        });
        setTasks(updatedTasks);
    }

    const onComplete = (id: string, isChecked: boolean) => {

        const updatedTasks = tasks.map((task) => {
            if(task.id === id) {
                return {...task, isCompleted: isChecked}
            }
            return {...task}
        });

        setTasks(updatedTasks);
    }
    const getNewPrice = (id: string, price: number) => {
        const updatedPrice = tasks.map((e) => {
            if(e.id === id) {
                return {...e, price: price}
            }
            return {...e}
        })
        setTasks(updatedPrice)
    }

    const [loading, setLoading] = useState(false)

    const getApiFactCat = async () => {
        setLoading(true);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 3000)
        })
        const response = await fetch(
            "https://catfact.ninja/fact"
        ).then((response) => response.json());

        setLoading(false);
        setFact(response.fact);
    };


    return (
        <main className="container">
            <section className="header">
                <button onClick={() => addTask(title, price)} className="header__btn" type="button">Add</button>
                <input onChange={(e) => setTitle(e.target.value)} className="header__input" type="text" value={title} placeholder="Enter Title" />
                <input onChange={(e) => setPrice(Number(e.target.value))} value={price} placeholder="Enter price"/>
                <button onClick={() => {
                    setTasks([])
                }} className="header__btn" type="button">Delete All</button>
            </section>
            <section className="content">
                {tasks.map((task,) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDelete={deleteTask}
                        isChecked={task.isCompleted}
                        onChange={onComplete}
                        date={task.date}
                        price={task.price}
                        onChangePrice={getNewPrice}/>
                ))}
            </section>
            <section className="content">
                <div>Tasks: {countCompletedTasks}/{tasks.length}</div>
            </section>

            <section className="content">
                <div>Total price: {calcTotalPrise}</div>
            </section>

            <section className="content">
                <div>{loading ? 'Loading...' : fact}</div>
                <button className='fact-btn' disabled={loading} onClick={() => getApiFactCat()}>Refresh fact</button>
            </section>

            <Bitcoin />
            <Register />

        </main>
    )
}