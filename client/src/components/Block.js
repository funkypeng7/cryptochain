import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';

class Block extends Component {
    state = {displayTransaction: false};

    toggleTransaction = () => {
        this.setState({ displayTransaction: !this.state.displayTransaction });
    }

    get displayTransaction() {
        const { data } = this.props.block;

        const stringifiedData = JSON.stringify(data);

        const dataDisplay = stringifiedData.length > 35 ? 
            `${stringifiedData.substring(0,35)}...`:
            stringifiedData;

        if (this.state.displayTransaction) {
            return (
                <div> 
                    {
                        data.map(transaction => (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        ))
                    }
                    <br />
                    <Button
                        bsStyle="danger"
                        bsSize="small"
                        onClick={this.toggleTransaction}
                    >
                        <b>Show Less</b>
                    </Button>

                </div>
            )
        }

        return (
        <div>
            <div><b>Data:</b> {dataDisplay}</div> 
            <Button
                bsStyle="danger"
                bsSize="sm"
                onClick={this.toggleTransaction}
            >
                <b>Show More</b>
            </Button>
        </div>
        );
    }


    render() {
        const { timestamp, hash } = this.props.block;

        const hashDisplay = `${hash.substring(0,15)}...`;
        

        return ( 
            <div className='Block'>
                <div><b>Hash:</b> {hashDisplay}</div>
                <div><b>Timestamp:</b> {new Date(timestamp).toLocaleString()}</div>
                <div>{this.displayTransaction}</div>
            </div>
        )
        
    }
}

export default Block;