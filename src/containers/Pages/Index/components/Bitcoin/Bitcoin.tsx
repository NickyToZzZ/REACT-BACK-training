import { useEffect, useState } from 'react';

export default function Bitcoin() {

    useEffect(() => { // запускаем функцию извлечения данных
        getBitcoinInfo()
    }, [])

    interface IBitcoin {
        currency: string
        lastUpdated: string
        USD: string
        GBP: string
        EUR: string
    }

    const [bitcoin, setBitcoin] = useState<IBitcoin>()
    const [loading, setLoading] = useState(false) // настраиваем Loading

    const getBitcoinInfo = async () => { // извлекаем через fetch API

        setLoading(true)

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 3000)
        })

        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then((response) => response.json())
    
        setBitcoin({
            currency: response.chartName,
            lastUpdated: response.time.updated,
            USD: response.bpi.USD.rate,
            GBP: response.bpi.GBP.rate,
            EUR: response.bpi.EUR.rate
        })

        setLoading(false)
    }    
    

    return ( 
        <>
        {loading ? 'Loading...' : (
        <section className="content">
            <div>Currency: {bitcoin?.currency}</div>
            <div>Last updated: {bitcoin?.lastUpdated}</div>
            <div>
                <div>USD: {bitcoin?.USD}</div>
                <div>GBP: {bitcoin?.GBP}</div>
                <div>EUR: {bitcoin?.EUR}</div>
            </div>
        </section>
        )}

        </>
     );
}


// 'https://api.coindesk.com/v1/bpi/currentprice.json'