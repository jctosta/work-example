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
        <div className="container">
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label" htmlFor="title-filter">Title Contains: </label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input" id="title-filter" type="search" onChange={handleInputChange.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label" htmlFor="decade-filter">Decade: </label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select id="decade-filter" onChange={handleDecadeFilter.bind(this)}>
                                    <option value="0"></option>
                                    {decades}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterToolbar;