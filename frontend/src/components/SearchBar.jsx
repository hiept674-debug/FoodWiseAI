
function SearchBar({ keyword, setKeyword, onSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Bạn muốn ăn món gì hôm nay?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button type="submit">
                🔍 Tìm kiếm
            </button>
        </form>
    );
}

export default SearchBar;
