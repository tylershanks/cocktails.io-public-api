import { React, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import RecipeTray from './RecipeTray';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function MapLowerCards({value, searchBoxText}) {

const [expanded, setExpanded] = useState(false);
const [selectedCard, setSelectedCard] = useState();
const [cardClickResponse, setCardClickResponse] = useState(null);
const [cardCollapseArea, setCardCollapseArea] = useState();

let handleOnCardClick = (item, i) => {
    setExpanded(expanded === i ? -1 : i, setCardClickResponse(undefined));
    setSelectedCard(item.idDrink)
    changeCardFunction();
}

const changeCardFunction = async (i) => {
    try {
        const data = await axios
            .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + selectedCard)
            .then(res=> {
                setCardClickResponse(res.data);
            })
        } catch (e) {
            console.log(e)
        }
}

useEffect(() => {
    changeCardFunction()
    }, [selectedCard])

useEffect(() => {
    setExpanded(expanded === -1)
}, [searchBoxText])
useEffect(() => {
    setExpanded(expanded === -1)
}, [value])

let drinksListed = value.data.drinks.map((item, i) => {
    return (
        //each individual drink
        <Card key={item.idDrink} 
            id={item.idDrink}
            sx={{ bgcolor: '#fcde67', m: 1, boxShadow: 3}}
            >
            <CardActionArea
                expand={expanded}
                onClick={() => handleOnCardClick(item, i)}
                aria-expanded={expanded === i}
            >
                <CardHeader
                    title={
                        <Typography 
                        fontSize='1.5rem'
                        display='flex'
                        justifyContent='center'
                        >
                            {item.strDrink}
                        </Typography>
                    }
                    sx={{ 
                        bgcolor: '#5bccf6',
                        color: '#030e12',
                    }}
                />
            </CardActionArea>
            <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                <CardContent
                    sx={{ 
                        bgcolor: '#fcde67'
                    }}
                    >
                        {(cardClickResponse) ? <RecipeTray cardClickResponse={cardClickResponse}/> 
                            : 
                        <Box sx={{ display: 'flex',
                                    justifyContent: 'center'}}>
                            <CircularProgress />
                        </Box>}
                    
                </CardContent>
            </Collapse>
        </Card>
    )
})




    return (
        <>
            {drinksListed}
        </>
    )
}

export default MapLowerCards;