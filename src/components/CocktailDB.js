import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';
import MapLowerCards from './MapLowerCards';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


function GetCocktailFromApi() {
    // used for the initial useEffect call to set 
    // the right filter box contents from all 4 possible filters
    const [alcoholicResponse, setAlcoholicResponse] = useState();
    const [categoriesResponse, setCategoriesResponse] = useState();
    const [glassesResponse, setGlassesResponse] = useState();
    const [ingredientResponse, setIngredientResponse] = useState();

    // Initial useEffect's used to call to the API
    // to get the right filter box contents from all 4 possible filters 
    useEffect(() => {
        const res = axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
        .then(res => {
                setAlcoholicResponse(res.data);
            })
        }, [])
    useEffect(() => {
        const res = axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then(res => {
                setCategoriesResponse(res.data);
            })
        }, [])
    useEffect(() => {
        const res = axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
        .then(res => {
                setGlassesResponse(res.data);
            })
        }, [])
    useEffect(() => {
        const res = axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(res => {
                setIngredientResponse(res.data);
            })
        }, [])



    //Left Box, always the same 4 options. will edit below link to populate the right box
        // https://www.thecocktaildb.com/api/json/v1/1/list.php?{CHAR TO CHANGE}=list

    //Right Box
    // https://www.thecocktaildb.com/api/json/v1/1/list.php?{CHAR TO CHANGE}=list
        // CTC can be c, g, i, or a
        // categories, glasses, ingredients or alcoholic

        
    //listSortLetter is the letter determining our list search string from DB
    const [listSortLetter, setListSortLetter] = useState();
    //right box selection
    const [rightBoxContents, setRightBoxContents] = useState();
    //response from the API based on our right box selection
    const [rightBoxResponse, setRightBoxResponse] = useState();
    //what is in the lower box based on the filters or the search bar
    const [lowerBoxContents, setLowerBoxContents] = useState();
    //sets and remembers the default values for the inital fields in our filters
    const [rightBoxInitalField, setRightBoxInitialField] = useState(<MenuItem value='one'>Select Filter</MenuItem>);
    const [leftBoxInitalField, setLeftBoxInitialField] = useState(<MenuItem value='initial'>Filter</MenuItem>);
    //user entered search box text and the api response to that text
    const [searchBoxText, setSearchBoxText] = useState();
    const [searchBoxResponse, setSearchBoxResponse] = useState();


    let handleLeftBoxChange = (e) => {
        //determines the search string in our URL API call
        setListSortLetter(e.target.value);
        //resets the search box text to avoid confusion as to what is being used to filter/search
        setSearchBoxText('')
        //removes the initial field from our search box (has to be done separately like this
        //so we can add it back later, when search bar is used)
        setLeftBoxInitialField()
        if(e.target.value === 'a'){
            //separate inital right box fields are set based on the left box selection
            setRightBoxInitialField(
                <MenuItem value='initial' selected disable hidden>Select Alcohol/Non-Alcohol</MenuItem>
            )
            //based on our api response, maps the response to the options in our right box
            setRightBoxContents(
                alcoholicResponse.drinks.map((item) => {
                    const { strAlcoholic } = item;
                    return (
                        <MenuItem 
                            key={item.strAlcoholic}
                            value={item.strAlcoholic}
                        >{item.strAlcoholic}</MenuItem>
                    )
                })
            )
        }else if (e.target.value === 'c'){
            setRightBoxInitialField(
                <MenuItem value='initial' selected disable hidden>Select Category</MenuItem>
            )
            setRightBoxContents(
                categoriesResponse.drinks.map((item) => {
                    const { strCategory } = item;
                    return (
                        <MenuItem 
                            key={item.strCategory}
                            value={item.strCategory}
                        >{item.strCategory}</MenuItem>
                    )
                })
            )
        }else if (e.target.value === 'g'){
            setRightBoxInitialField(
                <MenuItem value='initial' selected disable hidden>Select Glass Type</MenuItem>
            )
            setRightBoxContents(
                glassesResponse.drinks.map((item) => {
                    const { strGlass } = item;
                    return (
                        <MenuItem 
                            key={item.strGlass}
                            value={item.strGlass}
                        >{item.strGlass}</MenuItem>
                    )
                })
            )
        }else if (e.target.value === 'i'){
            setRightBoxInitialField(
                <MenuItem value='initial' selected disable hidden>Select Ingredient</MenuItem>
            )
            setRightBoxContents(
                ingredientResponse.drinks.map((item) => {
                    const { strIngredient1 } = item;
                    return (
                        <MenuItem 
                            key={item.strIngredient1}
                            value={item.strIngredient1}
                        >{item.strIngredient1}</MenuItem>
                    )
                })
            )
        }else{
            console.log('if statement in handleLeftBoxChange')
        }
        //activates this function to change what the right box options are
        handleRightBoxChange();
    }

    //once the api is loaded, it will change the rightBoxResponse
    //which triggers the next useEffect
    let handleRightBoxChange = async (e) => {
        //remove spaces and replace with _ for url
        let urlified = e.target.value.replace(/ /g,"_");
        let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + listSortLetter +'=' + urlified;
        const res = axios.get(url)
        //activates the useEffect on rightBoxResponse change, 
        //passes in the api response
        setRightBoxResponse(res)

        //removes the right box initial field
        setRightBoxInitialField()
        //removes the left box initial field
        setLeftBoxInitialField()
        //clears the search box to let users know the search bar is not being used 
        //in this filter 
        setSearchBoxText('')
    }

    //fired when rightBoxResponse changes
    useEffect(() => {
            if (rightBoxResponse === undefined) {
                return console.log('if hit, rBR is undefined')
            }else{
                //waits for rightBoxResponse and maps the 
                //data to lowerBoxContents
                rightBoxResponse.then((value) => {
                    setLowerBoxContents(
                        <Container
                        sx={{minWidth:'220px',
                            width:'90vw',
                            maxWidth:'650px'}}
                            maxWidth={false}
                        >
                            <MapLowerCards
                                value={value}
                                searchBoxText={searchBoxText}
                            />
                        </Container>
                    )
                })
            }
    }, [rightBoxResponse]);

    //fires every time a letter is typed/backspaced in the search bar
    let handleSearchBarChange = async (e) => {
        setSearchBoxText(e.target.value)
        //resets the left and right box to avoid confusion
        setLeftBoxInitialField(
            <option value='initial' selected disable hidden>Filter</option>
        )
        setRightBoxInitialField(
            <option value='initial' selected disable hidden>Select Filter</option>
        )
        
        // gets the url from the user input and declared the response
        let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + e.target.value;
        const res = axios.get(url)
        //changes searchBoxResponse with our api response
        //fires the next useEffect
        setSearchBoxResponse(res)
    }

    //fired when search bar is typed in/backspaced
    useEffect(() => {
        if (searchBoxResponse === undefined) {
            return console.log('LOADING')
        }else{
            searchBoxResponse.then((value) => {
                //if search returns nothing, tell user
                if (value.data.drinks === null){
                    setLowerBoxContents(
                        <Typography
                        sx={{m: 1}}>No Drinks Found</Typography>
                    )
                }else{
                    //maps the listed drinks to the lowerBox
                    setLowerBoxContents(
                        <Container
                        sx={{minWidth:'220px',
                            width:'90vw',
                            maxWidth:'650px'}}
                            maxWidth={false}
                        >
                            <MapLowerCards
                                value={value}
                                searchBoxText={searchBoxText}
                            />
                        </Container>
                    )
                }
            })
        }

    }, [searchBoxResponse])

    return (
        <Box
            sx={{
                width:'100vw',
                mt: 1
            }}
        >
            <TextField 
                type='search'
                id="standard-basic" 
                label="Search" //placeholder
                variant="standard" 
                onChange={handleSearchBarChange}
                value={searchBoxText}
            />

            <Typography
                        sx={{mt: 2, mb:1}}> -OR- </Typography>
            

            <FormControl sx={{minWidth:'140px', mr:1, mb:1}} variant="standard">
                <InputLabel id='leftBox'>First Select</InputLabel>
                <Select labelId='leftBox' onChange={handleLeftBoxChange} label='Filter'>
                    {/* {leftBoxInitalField} */}
                    <MenuItem value='c'>Category</MenuItem>
                    <MenuItem value='g'>Glass Type</MenuItem>
                    <MenuItem value='i'>Ingredient</MenuItem>
                    <MenuItem value='a'>Alcoholic/NonAlcoholic</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{minWidth:'140px', ml:1, mb:1}} variant="standard">
                <InputLabel id='rightBox'>Second Select</InputLabel>
                <Select labelId='rightBox' onChange={handleRightBoxChange}>
                    {/* {rightBoxInitalField} */}
                    {rightBoxContents}
                </Select>
            </FormControl>

            <Box>{lowerBoxContents}</Box>
        </Box>
    )
}

export default GetCocktailFromApi;