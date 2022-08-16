import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

//cardClickResponse passed in as props
function RecipeTray({cardClickResponse}) {
    
    //takes the cardClickResponse and picks out the instructions and assigns it to a variable
    let instructions = <Typography>{cardClickResponse.drinks[0].strInstructions}</Typography>
    
    //counts and ingredients listed. since this is not an array, i cannot map it
    //if the exact ingredient or measure is null, nothing shows up
    let countsAndIngredientsListed = 
    <Box
                sx={{
                    boxShadow: 0, // theme.shadows[1]
                    color: '#030e12', // theme.palette.primary.main
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    }}
                >
        <Typography>
            {cardClickResponse.drinks[0].strMeasure1}
            {cardClickResponse.drinks[0].strIngredient1}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure2}
            {cardClickResponse.drinks[0].strIngredient2}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure3}
            {cardClickResponse.drinks[0].strIngredient3}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure4}
            {cardClickResponse.drinks[0].strIngredient4}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure5}
            {cardClickResponse.drinks[0].strIngredient5}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure6}
            {cardClickResponse.drinks[0].strIngredient6}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure7}
            {cardClickResponse.drinks[0].strIngredient7}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure8}
            {cardClickResponse.drinks[0].strIngredient8}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure9}
            {cardClickResponse.drinks[0].strIngredient9}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure10}
            {cardClickResponse.drinks[0].strIngredient10}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure11}
            {cardClickResponse.drinks[0].strIngredient11}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure12}
            {cardClickResponse.drinks[0].strIngredient12}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure13}
            {cardClickResponse.drinks[0].strIngredient13}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure14}
            {cardClickResponse.drinks[0].strIngredient14}
        </Typography>
        <Typography>
            {cardClickResponse.drinks[0].strMeasure15}
            {cardClickResponse.drinks[0].strIngredient15}
        </Typography>
    </Box>;

    return(
        <Box
        sx={{
            boxShadow: 0, // theme.shadows[1]
            color: '#030e12', // theme.palette.primary.main
            m: 1, // margin: theme.spacing(1)
            }}>
            <Divider>
                <Typography variant='body2'>
                    Ingredients
                </Typography>
            </Divider>
            <Box
                sx={{
                    boxShadow: 0, // theme.shadows[1]
                    color: '#030e12', // theme.palette.primary.main
                    m: 1, // margin: theme.spacing(1)
                    p: {
                        xs: 1, // [theme.breakpoints.up('xs')]: { padding: theme.spacing(1) }
                    },
                    zIndex: 'tooltip', // theme.zIndex.tooltip
                    }}
                >
                    <Box //box for counts and ingredients
                        sx={{
                            boxShadow: 0, // theme.shadows[1]
                            color: '#030e12', // theme.palette.primary.main
                            bgcolor: '#fcde67',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                            }}
                    >
                        {countsAndIngredientsListed}
                    </Box>
            </Box>
            <Divider>
                <Typography variant='body2'>
                    Instructions
                </Typography>
            </Divider>
            <Box
                sx={{
                    boxShadow: 0, // theme.shadows[1]
                    color: '#030e12', // theme.palette.primary.main
                    m: 1, // margin: theme.spacing(1)
                    pt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '5px',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                >
                    {instructions}
            </Box>
        </Box>
    )
    
    
}

export default RecipeTray;