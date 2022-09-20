import * as React from 'react';


const App = ()=> {
  const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
 
   const [searchTerm,setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );
  const [stories,setStories] = React.useState(initialStories);
  
  const handleRemoveStory = (item)=>{
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };
  
  React.useEffect(()=>{
     localStorage.setItem("search",searchTerm)}
     ,[searchTerm]);

  const handleSearch = (event)=>{
    setSearchTerm(event.target.value) ;
   
  };
  
  const searchedStories = stories.filter((story)=>{
    return story.title.includes(searchTerm)
  })
  
  return (
    <div>
      <h1>My Hacker Stories</h1>
      
        <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}>
        <strong>Search: </strong>
       </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem = {handleRemoveStory}/>

    </div>
  );
}

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
  
  
}) => {

  const inputRef = React.useRef();
  React.useEffect(()=> {
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  },[isFocused]);
  return (
  
       
      <>
      
          <label htmlFor={id}>{children}</label>
          <input
          ref = {inputRef}
          id={id}
          type={type}
          value={value}
          autoFocus ={isFocused}
          onChange={onInputChange}
        />
        
      </>
);
};


const List = ({list, onRemoveItem})=>(
      <ul>
          {list.map((item)=>(
            <Item 
            key= {item.objectID} 
            item={item} 
            onRemoveItem = {onRemoveItem}
            />
          ))}
          
      </ul>
);

const Item = ({item, onRemoveItem})=>{

  const handleRemoveItem = ()=>{
    onRemoveItem(item);
  };
  return(
            <li>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button type="botton" onClick={handleRemoveItem}>
                  Dismiss
                </button>
              </span>
          </li>
                
);
};

export default App;