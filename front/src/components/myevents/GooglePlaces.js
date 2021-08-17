import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';

export default function GooglePlaces(props) {

    const handleChange = Address => {
        props.setAddress(Address);
    };
    const handleSelect = Address => {
        props.setAddress(Address);
    };
   
    return (
        <PlacesAutocomplete
            value={props.Address || ''}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        minLength="5"
                        maxLength="100"
                        required
                        name={props.Address}
                        id={props.Address}
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className={`autocomplete-dropdown-container ${suggestions.length > 0 ? "active" : ""}`}>
                        {loading &&
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        }
                        {suggestions.map(suggestion => {
                            console.log(suggestion)
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div key={suggestion.id}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}