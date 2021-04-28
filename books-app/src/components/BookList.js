import React, {Component} from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import styles from './BookListStyles.css'


class BookList extends Component {

    constructor(props){
        super(props)

        this.state = {
            queryString : 'Harry Potter',
            bookDetails : [],
            errorMessage : null,
            isLoading : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChange(event) {
        this.setState({
            queryString : event.target.value
        });
        console.log(this.state.queryString)
    }
   
    handleSubmit(event) {
        event.preventDefault();
        this.fetchData();
        console.log(this.state.queryString);
    }

    fetchData() {
        const promise = axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.queryString);
       
        trackPromise( promise
          .then((response) => {
            console.log('response', response);
            if (response.data.items) {
                this.setState({
                    bookDetails: response.data.items,
                    errorMessage: null
                });
            } else {
                this.setState({ errorMessage: 'No books found for ' });
            }
        })
          .catch((error) => {
            this.setState({ errorMessage: 'Network failure' })
        }));
    }
      render () {
        const isError = this.state.errorMessage;
          return (
            <div>
            <h1>REACT dynamic booklist</h1>
                <div className="BookList_input align_right">
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="align_right"> Enter a search term: &nbsp;
                            <input 
                                type='text' 
                                name='bookSearch' 
                                placeholder='Harry Potter'
                                onChange={this.handleChange}
                            />
                            <button type="submit">Submit</button>
                        </h3>
                    </form> 
                </div> 
                <div className="BookList_item">
                    <ul>
                    {isError 
                        ? <li>{this.state.errorMessage}</li>
                        : this.state.bookDetails &&
                            this.state.bookDetails.map( (bookDetail) => {
                            return (
                                <li key={bookDetail.id}>
                                    <a href={bookDetail.volumeInfo.infoLink} target="_blank" className="BookList_detailed">
                                        <h2>{bookDetail.volumeInfo.title}</h2>
                                        <h3>Category: {bookDetail.volumeInfo.categories}</h3>
                                    </a> 
                                    <img src={bookDetail.volumeInfo.imageLinks.thumbnail} alt="thumbnails" className="Thumbnail_img"/>
                                    <p className="BookList_description">{bookDetail.volumeInfo.description}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
          )}  
}

export default BookList;