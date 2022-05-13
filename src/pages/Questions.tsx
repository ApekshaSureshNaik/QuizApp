import { useEffect, useState } from "react";
import QuestionCard, { QuestionType } from "../components/QuesCard";
import questions from "../questions.json";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Box,CssBaseline,Container} from "@mui/material";
import Pagination from '@mui/material/Pagination';

const TOTAL_QUESTIONS = questions.length;

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
 const [page,setPage]=useState(questions[0].id);
 const handlePages = (updatePage: number) => setPage(updatePage);


  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  function handleNextButtonClick(index: number) {
    if (index === TOTAL_QUESTIONS - 1) {
      navigate("/results");
    } else {
      setCurrentQuestion((prev) => prev + 1);
      
    }
  
  }   
   const handlePrevPage = (index: number) => {
     setPage((index) => index - 1);
   };

  const handleNextPage = (index: number) => {
     setPage((index) => index + 1);
  };

 return (
    
  
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      
      {isLoading ? (
        <CircularProgress />
      ) : (
        questions.map(
          (question, index) =>
            currentQuestion === question.id && (
              <Box key={question.id}>
                <Typography variant="h3" sx={{color:"#15133C" }} >Question: {index + 1}</Typography>
                
                <CssBaseline/>
                   <Container component={Box} py={3} >
                <Pagination color="primary"
                 count={5} 
                variant="outlined"
                
                />
                
                  </Container> 
                <Box
                  height="500px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  
                  
                  <QuestionCard
                    id={question.id}
                    question={question.question}
                    questionType={question.questionType as QuestionType}
                    answers={question.answerOptions}
                  />

                   <Box 
                    height="10px"
                    width="20px"
                    color="#92BA92"
                    display="flex"
                    
                    >
 
                     </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                   

                    <Button
                      disabled={index === 0}
                      onClick={() => setCurrentQuestion((prev) => prev - 1)}
                    >
                      Previous
                    </Button>

                    <Button onClick={() => handleNextButtonClick(index)}>
                      {index === TOTAL_QUESTIONS - 1 ? "Submit" : "Next"}
                    </Button>
                  </Box>
                </Box>
              </Box>
              
            )
        )
      )}

    </Box>
    
  );
};

export default Questions;