import React from 'react'
import { Pagination as BsPagination } from 'react-bootstrap'

const Pagination = ({ options }) => {

    const { currentPage, setCurrentPage, itemsQtyAll, itemsQtyOnPage } = options

    const siblingPages = 3

    const pagesCount = Math.ceil(itemsQtyAll / itemsQtyOnPage)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const changePage = (page) => {
        switch (page) {
            case '<<':
                setCurrentPage(1)
                break;
            case '>>':
                setCurrentPage(pagesCount)
                break;
            case '<':
                setCurrentPage(currentPage - 1)
                break;
            case '>':
                setCurrentPage(currentPage + 1)
                break;
            case 'l...':
                setCurrentPage(currentPage - siblingPages - 1)
                break;
            case 'r...':
                setCurrentPage(currentPage + siblingPages + 1)
                break;
            default:
                setCurrentPage(page)
                break;
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <BsPagination>
                <BsPagination.First disabled={pagesCount === 1 || currentPage === 1}
                    onClick={() => changePage('<<')} />
                <BsPagination.Prev disabled={pagesCount === 1 || currentPage === 1}
                    onClick={() => changePage('<')} />
                <BsPagination.Ellipsis hidden={currentPage <= siblingPages + 1}
                    onClick={() => changePage('l...')} />

                {pages.map(i => (
                    <BsPagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => changePage(i)}
                        hidden={(i < currentPage - siblingPages) || (i > currentPage + siblingPages)}
                    >
                        {i}
                    </BsPagination.Item>))}

                <BsPagination.Ellipsis hidden={currentPage >= pagesCount - siblingPages}
                    onClick={() => changePage('r...')} />
                <BsPagination.Next disabled={currentPage === pagesCount} onClick={() => changePage('>')} />
                <BsPagination.Last disabled={currentPage === pagesCount} onClick={() => changePage('>>')} />
            </BsPagination>
        </div>
    )
}

export default Pagination