import React from 'react';

function FilterToolbar(props) {

    const handleInputChange = event => {
        const inputValue = event.target.value;
        if (inputValue.length >= 2) {
            props.filterHandler(event.target.value);
        } else {
            props.filterHandler('');
        }
    }

    /** @todo: Extract possible decades from movie list */
    const decadeValues = ['1960', '1970', '1980', '1990', '2000', '2010', '2020'];
    const decades = decadeValues.map((decade, index) => <option key={index} value={decade}>{decade}</option>);

    const handleDecadeFilter = event => {
        const comboValue = event.target.value;
        props.decadeFilterHandler(comboValue);
    }

    return (
        <div className="filters">
            <div>
                <label htmlFor="title-filter">Title Contains: </label>
                <input id="title-filter" type="search" onChange={handleInputChange.bind(this)} />
            </div>
            <div>
                <label htmlFor="decade-filter">Decade: </label>
                <select id="decade-filter" onChange={handleDecadeFilter.bind(this)}>
                    <option value="0"></option>
                    {decades}
                </select>
            </div>
        </div>
    );
}

export default FilterToolbar;