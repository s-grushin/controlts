import { Form, Pagination } from 'react-bootstrap'

const MovePagination = ({ currentPage, setCurrentPage, pagesQty, pageSize, onPageSizeChange }) => {

    const handleClick = (item) => {
        switch (item) {
            case 'first':
                return setCurrentPage(1)
            case 'prev':
                return setCurrentPage(currentPage - 1)
            case 'next':
                return setCurrentPage(currentPage + 1)
            case 'last':
                return setCurrentPage(pagesQty)
            default:
                return setCurrentPage(1)
        }
    }

    return (

        <Pagination className='fw-bold'>
            < Pagination.First onClick={() => handleClick('first')} disabled={currentPage === 1} />
            < Pagination.Prev onClick={() => handleClick('prev')} disabled={currentPage === 1} />
            < Pagination.Next onClick={() => handleClick('next')} disabled={currentPage === pagesQty} />
            < Pagination.Last onClick={() => handleClick('last')} disabled={currentPage === pagesQty} />

            <Form.Select onChange={e => onPageSizeChange(e.target.value)} defaultValue={pageSize} className='ms-2' size='sm'>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
            </Form.Select>

        </Pagination >
    )
}

export default MovePagination