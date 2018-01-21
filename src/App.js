import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { promisifyAll } from 'bluebird'
import { abi as contractAbi } from './../build/contracts/Trees.json'

const contractAddress = '0xdf663707454e0d069ecdfd7251d27a032de6221f'
const originalOwner = '0x7461CCF1FD55c069ce13E07D163C65c78c8b48D1'

class App extends React.Component {
	constructor () {
		super()
		this.state = {
			output: 'This will be the output'
		}

		window.web3 = new Web3(web3.currentProvider || new Web3.providers.HttpProvider('https://rinkeby.infura.io/6GO3REaLghR6wPhNJQcc'))
		window.contract = web3.eth.contract(contractAbi).at(contractAddress)
		promisifyAll(contract)
	}

	async generateTree() {
		const result = await contract.generateTreeAsync({
			from: web3.eth.accounts[0]
		})
		this.show(result)
	}

	async getTreeById() {
		const result = await contract.treeDetailsAsync(1, {
			from: web3.eth.accounts[0]
		})
		this.show(result)
	}

	async getTreeIds() {
		const result = await contract.getTreeIdsAsync(web3.eth.accounts[0], {
			from: web3.eth.accounts[0]
		})
		this.show(result)
	}

	async putTreeOnSale() {
		const result = await contract.putTreeOnSaleAsync(1, {
			from: web3.eth.accounts[0]
		})
		this.show(result)
	}

	async buyTree() {
		const result = await contract.buyTreeAync(1, originalOwner, {
			from: web3.eth.accounts[0]
		})
		this.show(result)
	}

	show(content) {
		this.setState({
			output: typeof content === 'object' ? content.join(' - ') : content
		})
	}

	render () {
		return (
			<div>
				<button onClick={() => this.getTreeById()}>getTreeById 1</button>
				<button onClick={() => this.getTreeIds()}>getTreeIds</button>
				<button onClick={() => this.generateTree()}>generateTree</button>
				<button onClick={() => this.putTreeOnSale()}>putTreeOnSale</button>
				<button onClick={() => this.buyTree()}>buyTree</button>
				<div>{this.state.output}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
