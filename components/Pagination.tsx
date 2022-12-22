export default function Pagination({page, setPage}) {
    const pageStart = page >= 25 ? 25 : 0;
    const pageEnd = page >= 25 ? 50 : 25;
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <a onClick={() => setPage(page-1)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {Array(50).fill(0, pageStart, pageEnd).map((_, i) => {
                        return (
                            <li key={i}>
                                <a onClick={() => setPage(i+1)} className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === i + 1 ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>{i + 1}</a>
                            </li>
                        )
                    })}
                    <li>
                        <a onClick={() => setPage(page+1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav></>
    )
}