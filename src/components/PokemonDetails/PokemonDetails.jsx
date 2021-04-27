import styles from './PokemonDetails.module.css'; 

const PokemonDetails = ({ pokemonData}) => {
    return (
        <div className={styles.pokemonDetails}>
            <div className={styles.details}>
                <h2>{`Nº ${pokemonData.id}`}</h2>
                <h1>{pokemonData.name}</h1>
                <div className={styles.pokemonInfo}>
                    <div>
                        <h4>Weight: {pokemonData.weight / 10}kg</h4>
                        <h4>Height: {pokemonData.height / 10}m</h4>
                        <span>Type(s):</span>
                            {pokemonData.types.map(types => (
                            <span> {types.type.name} </span>
                        ))}
                    </div>
                    <div>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
                    </div>
                </div>
                <div className={styles.skills}>
                    <br/>
                    <span>Skills:</span>
                    {pokemonData.moves.map((skill) => (
                        <span> {skill.move.name} </span>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default PokemonDetails
