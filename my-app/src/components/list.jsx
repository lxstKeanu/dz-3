import React, { Component } from 'react';
import PropTypes from 'prop-types';
import someData from './news.json'


export class List extends Component {
    state = {
        isSpecial: false,
        link: false,
        photo: false,
        search: '',
    };

    render() {
        const { isSpecial, link, photo, search } = this.state;
        const listToRender = someData.filter((el) => {
            if (isSpecial && el.isSpecial === false) return false;
            if (link && el.link === null) return false;
            if (photo && el.photo === null) return false;
            return  !(el.title.toLowerCase().indexOf(search.toLowerCase()) < 0)
            || !(el.content.toLowerCase().indexOf(search.toLowerCase()) < 0)
            || !(el.author.toLowerCase().indexOf(search.toLowerCase()) < 0)
        });
        console.log(listToRender)
        return(
            <div className='Main__Button__Filters'>
                <div className='Main__Filters'>
                    <label>
                        <input
                            onChange={() => this.setState({isSpecial: !isSpecial})}
                            type="checkbox"
                            checked={isSpecial}
                        /> <span>Filter only IsSpecial</span>
                    </label>
                    <label>
                        <input
                            onChange={() => this.setState({link: !link})}
                            type="checkbox"
                            checked={link}
                        /> <span>Filter has link</span>
                    </label>
                    <label>
                        <input
                            onChange={() => this.setState({photo: !photo})}
                            type="checkbox"
                            checked={photo}
                        /> <span>Filter has photo</span>
                    </label>
                </div>
                {listToRender.map((item) => (
                    <div className='Main__Cards' key={item.id}>
                        <h1 className='Main__h1'>{item.title}</h1>
                        <h2 className='Main__h2' dangerouslySetInnerHTML={{__html: item.content}}/>
                        <div className='Main__isSpecial'>{item.isSpecial ? "Special" : ""}</div>
                        <date className='Main__Date'>{item.dateCreated.slice(0, 19)}</date>
                        <div className='Main__Categories'>{item.categories.map((cat) => (
                            <div key={cat.id}>
                                <div>{cat.id}</div>
                                <p>{cat.name}</p>
                            </div>
                        ))}</div>
                        {item.link && <a className='Main__Link' href={item.link}>{item.link}</a>}
                        {item.photo && <img className='Main__Img' src={item.photo + item.id}/>}
                        {item.author && <h4 className='Main__Author'>{item.author}</h4>}
                    </div>
                ))};
            </div>
        )
    }
}


List.propTypes = {};
List.defaultProps = {};