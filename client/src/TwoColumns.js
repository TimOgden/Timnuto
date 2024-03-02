function TwoColumns({
    data,
    onClickHandler
}) {
    return (
        <ul>
            {data.map((interval, i) => (
                <li key={i}>
                    <button
                    key={interval[0].key}
                    className="guessButton"
                    data-interval={interval[0].key}
                    onClick={(event) => onClickHandler(interval[0].key, event)}
                    disabled={interval[0].key === 'blank'}
                    >
                        {interval[0].value}
                    </button>
                    <button
                    key={interval[1].key}
                    className="guessButton"
                    data-interval={interval[1].key}
                    onClick={(event) => onClickHandler(interval[1].key, event)}
                    disabled={interval[1].key === 'blank'}
                    >
                        {interval[1].value}
                    </button>
                </li>
            ))}
        </ul>
    )
}


export default TwoColumns;