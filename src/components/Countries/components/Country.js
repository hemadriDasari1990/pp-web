import React, { Component } from 'react';
import countries from '../../../../assets/json/countries.json';
import CardComponent from '../../Card/components/Card';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

export default class Country extends Component{
	render(){
		return(
			<GridList cols={5}>
				{countries.map((country, index) => (
					<GridListTile key={'Key-'+index}>
						<CardComponent name={country.country_name} code={country.country_code} phCode={country.dialling_code} />
					</GridListTile>
				))}
			</GridList>
		)
	}
}