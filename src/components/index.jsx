import React, { Component } from 'react'
// import swal from 'sweetalert'
import swal from 'sweetalert2'
import Ruleta from './Ruleta'
import Premios from './Premios'
import './index.css';
import roulette from '../sounds/roulette.mp3'

class App extends Component {
	
	constructor(...props){
		super(...props);

		this.state = {
			total_points: 	0,
			data_ruleta: 	0,
			animated_ruleta: 	false,
		}

		this.teams_selected = [
			// {id: 'Gala Becas TodVertical', cat: 'Alpinismo'},
			'Esquí de montaña, marcha nórdica, barrancos, MTB, snowboard de montaña, etc.',
		]

		//ROD: this.premios_list 	=	[100,200,0,500,50,-1,0,150];
		this.teams_list 	=	[
								'Escalada deportiva, dry tooling deportivo y boulder',
								'Carreras por montaña (Trail)',
								'Montañismo y trekking',
								'Escalada en pared y de aventura',
								'Alpinismo',
								'Esquí de montaña, marcha nórdica, barrancos, MTB, snowboard de montaña, etc.',
								'Actividad Junior',
							];
		

		this.points_data = 0;
		this.rulets_data = 0;

		this.ruleta = React.createRef()

		this.animarEvent = this.animarEvent.bind(this)
		this.showRuletaResult = this.showRuletaResult.bind(this)
		this.shopPremio = this.shopPremio.bind(this)

	}

	componentDidMount(){
		
	}

	componentDidUpdate() {

	}

	animarEvent() {
		// Play a sound of a roulette
		var audio = new Audio(roulette);
		audio.play();
		audio.playbackRate = 0.8;
		setTimeout(() => {
			audio.pause();
		}, 5000);

		var ruleta_temp = this.rulets_data;

		let grados_circulo 	=	360;
		let premio 	= 	grados_circulo / 7;
		
		var valor_aleatorio =	Math.floor(Math.random()*7);
		var ruleta_result 	= 	premio * valor_aleatorio;
		var valor_premio 	= 	(grados_circulo	* 4) + ruleta_result;
		
		this.rulets_data = 	valor_aleatorio;

		// puntos ganados
		this.points_data 	= 	this.teams_list[valor_aleatorio];
		
		this.setState({
			data_ruleta: ruleta_temp * premio,
			animated_ruleta: true,
		})
		
		setTimeout(() => {
			this.ruleta.current.classList.add('img-ruleta');
			this.setState({
				data_ruleta: valor_premio,
			})
		}, 200);

		
	}

	showRuletaResult(){
		
		this.ruleta.current.classList.remove("img-ruleta");

		if (this.points_data >= 0) {
			
			this.setState({
				total_points: this.state.total_points + this.points_data,
				animated_ruleta: false,
			})

		}
		else{

			this.setState({
				animated_ruleta: false,
			})

		}

		// Check if the item is already in the list
		if (this.teams_selected.find(item => item.cat === this.points_data)) {
			swal("Ya ha salido esta categoría...vuelve a intentarlo", "", "warning");
		} else {
			swal(this.points_data, "", "success");
			this.teams_selected.push({cat: this.points_data});
		}
	}

	shopPremio(item){

		if (this.teams_selected[item].precio <= this.state.total_points) {

			this.setState({
				total_points: this.state.total_points - this.teams_selected[item].precio,
			})

			swal("Comprado", "Has comprado un item con éxito. ("+this.teams_selected[item].premio+")", "success");
			
		}
		else{

			swal("Ups...", "No tienes puntos suficientes para comprar este item...", "warning");

		}
		
	}

	render() {

		return (
			<div  id="main">
					<div className="row">

					<div className="col-md-6">
							<Ruleta 
								total_points={this.state.total_points}
								animatedRuleta={this.state.animated_ruleta} 
								data_ruleta={this.state.data_ruleta}
								showRuletaResult={this.showRuletaResult}
								animarEvent={this.animarEvent}
								ruleta={this.ruleta}
							/>
						</div>

						<div className="col-md-6">
							<h2 align="center" className="ruleta-puntos">SELECCIONADOS</h2>
							<br/>
							{
								this.teams_selected.map((item, index) => (
						       		<Premios
										//ROD: key={item.id}
										indice={index}
										data={item}
										total_points={this.state.total_points}
										shopPremio={this.shopPremio}
									/>
						    	))
							}
							<br/>
						</div>


					</div>
			</div>
		)

	}
}

export default App