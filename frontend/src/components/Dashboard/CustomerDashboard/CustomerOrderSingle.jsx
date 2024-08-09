import { useParams } from 'react-router'

function CustomerOrderSingle() {

    const { id } = useParams();

    return (
        <section className="mt-20">
            <div className="container">CustomerOrderSingle : {id}</div>
        </section>
    )
}

export default CustomerOrderSingle