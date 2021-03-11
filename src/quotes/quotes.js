import React from 'react';
import ReactDOM from 'react-dom';
import Tags from './tags.jsx';
import AllTags from './allTags.jsx';

class Quote extends React.Component { 
    _isMounted = false;

    constructor(){
      super();
      this.baseURL = "http://localhost/Quotables/src/api/";
      this.uid = 5;
      this.state = { isLoading : true, quotesdata : [], allTags : [] };
    }
    
    async componentDidMount(){
      this._isMounted = true;
      const q = await fetch(this.baseURL + 'fetchQuotes.php?uid=' + this.uid);
      const qjsonData = await q.json();
      const t = await fetch(this.baseURL + 'fetchTags.php?uid=' + this.uid);
      const tjsonData = await t.json();
      
      if(this._isMounted === true)
      {
      this.setState({ isLoading : false, quotesdata : qjsonData, allTags : tjsonData });
      } 
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }
  

    render() {
      let {isLoading, quotesdata, allTags} = this.state;

      if (isLoading){
        return (
          <div>Loading...</div>
        );
      }
      else{
        console.log(allTags)
        return (
        <div>
          <h1> Quotes Page </h1>
          {
            quotesdata.map(
              (quote,i) => (
                <div key={i}>
                <h3>{quote.quote}</h3>
                <h5>{quote.author}</h5>
                <Tags tags={quote.tags} />
                </div>
              )
            )
          }
          <AllTags allTags={allTags} />
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
