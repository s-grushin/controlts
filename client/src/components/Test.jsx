import { useEffect } from 'react'

const Test = () => {

    useEffect(() => {

        console.log('Test mounted');

    }, [])

    return (
        <div>Test</div>
    )
}

export default Test