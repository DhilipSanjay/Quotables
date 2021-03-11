import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

class Quote extends React.Component { 
    _isMounted = false;
    constructor(){
      super();
      this.baseURL = "http://localhost/Quotables/src/api/";
      this.uid = 1;
      this.state = { isLoading : true, quotesdata : [] };
    }
    
    async componentDidMount(){
      this._isMounted = true;
      const q = await fetch(this.baseURL + 'fetchQuotes.php?userid=' + this.uid);
      const jsonData = await q.json();
      console.log(jsonData);
      if(this._isMounted)
      {
      this.setState({ isLoading : false, quotesdata : jsonData });
      } 
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }
  

    render() {
      let {isLoading, quotesdata} = this.state;
      if(isLoading)
      {
        return(
          <div>Loading...</div>
        )
      }
      else
      {
        return (
          <div>
            <h1> Quotes Page </h1>
            {
              quotesdata.map(
                (quote,i) => (
                  <div key={i}>
                  <h3>{quote.quote}</h3>
                  <h5>{quote.author}</h5>
                  </div>
                )
              )
            }
          </div>
        );
      }
    }
  }
  
  ReactDOM.render(
    <Quote />,
    document.getElementById('root')
  );

  export default Quote;
