import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const styles = {
  modalTableBlock: {
    height: 185,
    width: '100%',
    overflowX: 'auto',
  },
  modalActionButtons: {
    textAlign: 'left',
  },
  modalBody: {
    padding: '0 12px',
  },
  pointerFloatRight: {
    cursor: 'pointer',
    float:'right',
  },
  modalTitle: {
    backgroundColor: "#f0f0f0",
  },
};

class ModalComponent extends Component {
  
  state={
    tableData:[
      { sel: 1, num: '1',},
      { sel: 1, num: '1',},
      { sel: 2, num: '2',},
      { sel: 3, num: '2',},
    ],
  };
  
  onChangeHandler = (i, name) => (event, key, val) => {
    var tableData = this.state.tableData;
    tableData[i][name]= (event.target.value || val);
    this.setState({tableData: tableData});
  };

  onAddRowHandler = () => {
    var tableData = this.state.tableData;
    tableData.push({sel:1,num:'',});
    this.setState({tableData: tableData});
  };

  onRemoveRowHandler = (i) => () => {
    var tableData = this.state.tableData;
    tableData.splice(i,1);
    this.setState({tableData: tableData});
  };
  
  onCloseHandler = () => {
    this.props.openControl();
  }
  
  onSaveHandler = () => {
    let data = this.state.tableData;
    this.props.openControl(data)
  }
  
  modalAppBar = (
    <div style={styles.modalTitle}>
      Структура номеров
      <ClearIcon 
        style={styles.pointerFloatRight}
        onClick={this.onCloseHandler}/>
    </div>
  );
  
  render() {
    const actions = [
      <RaisedButton 
        label="Сохранить" 
        primary={true} 
        onClick={this.onSaveHandler}
      />,
      <FlatButton
        label="Отмена"
        onClick={this.onCloseHandler}
      />,
    ];
    
  return (
    <div>
      <Dialog
          title={this.modalAppBar}
          actions={actions}
          actionsContainerStyle={styles.modalActionButtons}
          bodyStyle={styles.modalBody}
          modal={true}
          open={this.props.open}
          autoScrollBodyContent={true}
      >
        <div style={styles.modalTableBlock}>
          <Table selectable={false}>
          <TableBody 
            displayRowCheckbox={false}
          >
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  <SelectField
                    name="sel"
                    value={row.sel}
                    fullWidth={true}
                    onChange={this.onChangeHandler(index, "sel")}
                  >
                    <MenuItem value={1} primaryText="Twin" />
                    <MenuItem value={2} primaryText="Tripple" />
                    <MenuItem value={3} primaryText="Quadro" />
                  </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    type="number"
                    name="num"
                    value={row.num}
                    fullWidth={true}
                    onChange={this.onChangeHandler(index, "num")}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <IconButton onClick={this.onRemoveRowHandler(index)}>
                    <Avatar
                      icon={<ClearIcon />}
                      color="red"
                      backgroundColor="rgba(255, 0, 0, 0.25)"
                      size={30}
                    />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
        
        <FlatButton
          label="Добавить"
          primary={true}
          onClick={this.onAddRowHandler}
        />
      </Dialog>
    </div>
  )}
};

ModalComponent.propTypes = {
  openControl: PropTypes.function,
  open: PropTypes.boolean
};

export default ModalComponent;