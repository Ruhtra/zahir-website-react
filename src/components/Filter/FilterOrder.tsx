import { SetURLSearchParams } from "react-router-dom";

interface OrderProps {
    order: string
    onOrderChange: SetURLSearchParams;
}

export function FilterOrder({ order, onOrderChange }: OrderProps) {
    // const [selected, setSelected]  = useState(order)

    function handleOption(e: React.ChangeEvent<HTMLInputElement>) {
            onOrderChange((params) => {
                // if (selected)
                if (e.target.id == "createdOrder") {
                    params.set('order', e.target.id)
                }
                if (e.target.id != "createdOrder") {
                    params.set('order', '')
                }
                
                return params
            })
    }

    return (
        <div className="itenss categories scroll-style">
            <button className="mybtn">
                <input
                    type="checkbox"
                id={"createdOrder"}
                // name={category}
                checked={order == "createdOrder" ? true : false}
                onChange={handleOption}
                />
                <label htmlFor="createdOrder">Cronológica</label>
            </button>
            <button className="mybtn">
                <input
                    type="checkbox"
                    id={"ncreatedOrder"}
                    // name={category}
                    checked={order != "createdOrder" ? true : false}
                    onChange={handleOption}
                    />
                    <label htmlFor="ncreatedOrder">Alfabetica</label>
            </button>
        </div>
    )
}