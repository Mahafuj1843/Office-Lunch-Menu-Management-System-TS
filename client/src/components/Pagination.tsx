import ReactPaginate from 'react-paginate'

interface PaginationProps {
    pageNo: number;
    perPage: number;
    total: number,
    handlePageClick: ()=> void
}

const Pagination = ({pageNo, perPage,  total, handlePageClick}: PaginationProps) => {
    const start: number = (((pageNo-1)*perPage)+1);
    const end: number = pageNo*perPage > total ? total : pageNo*perPage;

    return (
        <div className='w-full flex flex-col gap-y-3 md:flex-row items-center justify-between py-5 '>
            <span className="text-md font-semibold">Showing {start + " - " + end} of {total}</span>
            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactPaginate className='pagination gap-2'
                    previousLabel="<"
                    nextLabel=">"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={Math.ceil(total / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </nav>
        </div>
    )
}

export default Pagination