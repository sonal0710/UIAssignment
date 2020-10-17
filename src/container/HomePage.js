import React, { Component } from "react";
import { Container, Row, Col, Button, Input, Form, FormGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import { FaTimesCircle } from 'react-icons/fa';
import ColoredLine from '../component/line/ColouredLine';
import UIButton from '../component/button/UIButton'

class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      queCount: 0,
      questions: []
    }
  }

  addNewQuestionHandler = () => {
    const newQuestion = {
      id: this.state.queCount + 1,
      question: "",
      type: "radio",
      options: [
        {
          id: 1,
          value: ""
        }
      ]
    }
    this.setState({
      queCount: this.state.queCount + 1,
      questions: [...this.state.questions, newQuestion]
    })
  }

  handleQuestionState = (questionsConfig) => {
    this.setState({
      questions: questionsConfig
    })
  }

  onChangeHandler = (e) => {
    const mainQueIndex = e.target.dataset.index;
    const key = e.target.name;
    const value = e.target.value;
    const questionsConfig = this.state.questions;

    questionsConfig[mainQueIndex] =
      {
        ...questionsConfig[mainQueIndex],
        [key]: value,
      }

    this.handleQuestionState(questionsConfig);
  }

  handleOptionChangeForQuestion = (mainQueIndex, optIndex, value) => {
    const questionsConfig = this.state.questions;

    questionsConfig[mainQueIndex].options[optIndex] =
      {
        ...questionsConfig[mainQueIndex].options[optIndex],
        value: value,
      }

    this.handleQuestionState(questionsConfig);
  }

  addMoreOptionsHandler = (mainQueIndex) => {
    const questionsConfig = this.state.questions;
    const newOption = {
      id: questionsConfig[mainQueIndex].options.length + 1,
      value: ""
    }

    questionsConfig[mainQueIndex].options =
      [
        ...questionsConfig[mainQueIndex].options,
        newOption,
      ]

    this.handleQuestionState(questionsConfig);
  }

  deleteOptionHandler = (mainQueIndex, optIndex) => {
    Swal.fire({
      text: `Are you sure you want to delete?`,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#fe5eab',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        const questionsConfig = this.state.questions;
        const options = questionsConfig[mainQueIndex].options;
        const filteredOption = options.filter((option) => option.id !== optIndex);
        questionsConfig[mainQueIndex].options = filteredOption;
        this.handleQuestionState(questionsConfig);
      }
    });
  }

  saveQuestions = () => {
    Swal.fire({
      text: 'Questions are logged successfully. Please check console.',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#fe5eab',
    }).then(() => {
      console.log("Question Details", this.state.questions);
    });
  }

  render() {
    return (
      <Container className=" white-box mt-2">
        <Row>
          <Col lg={{ size: 'auto', offset: 10 }}>
            <UIButton
              btnClickHandler={() => this.addNewQuestionHandler()}
              title="Add Question"
            />
          </Col>
        </Row>
        
        {this.state.questions.map((que, queindex) => (
          <Form key={que.id}>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="question"
                    placeholder="Enter Your Question" 
                    data-index={queindex}
                    value={que.question} 
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </FormGroup>
              </Col>
              <Col lg={2}>
                <FormGroup>
                <Input 
                  type="select" 
                  name="type"
                  data-index={queindex}
                  onChange={(e) => this.onChangeHandler(e)}
                >
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                </Input>
                </FormGroup>
              </Col>
            </Row>
            {que.options.map((option, optindex) => (
              <Row key={`option-${que.id}-${option.id}`}>
                <Col lg={1}>
                  <FormGroup className="ml-auto float-right" >
                    <Input type={que.type} disabled />{' '}
                  </FormGroup>
                </Col>
                <Col lg={4}>
                  <FormGroup>
                    <Input 
                      type="text" 
                      name="option"
                      placeholder="Enter Option"
                      value={option.value}
                      onChange={(e) => this.handleOptionChangeForQuestion(
                        queindex,
                        optindex,
                        e.target.value
                      )} 
                    />
                  </FormGroup>
                </Col>
                <Col lg={1}>
                  <FaTimesCircle 
                    className="del-option" 
                    onClick={() => this.deleteOptionHandler(
                      queindex,
                      option.id
                    )}
                  />
                </Col>
              </Row>
            ))}
            <Row>
              <Col lg={{ size: 'auto', offset: 1 }}>
                <Button color="link" onClick={() => this.addMoreOptionsHandler(queindex)}>+ Add Option</Button>
              </Col>
            </Row>
            <ColoredLine color="black" />
          </Form>
        ))}
        {this.state.questions.length ? 
          <Row>
            <Col lg={{ size: 'auto', offset: 5 }}>
              <UIButton
                btnClickHandler={() => this.saveQuestions()}
                title="Save"
              />
            </Col>
          </Row> 
        : null}
      </Container>
    );
  }
}

export default HomePage;
