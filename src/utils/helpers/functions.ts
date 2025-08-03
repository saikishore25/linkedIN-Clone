export function truncate(string: string, n: number){
    
  	return string.length > n ? `${string.substr(0, n - 1)}....` : string

}



export function getRandomIntNumberBetween(min = 1, max = 10){

	return Math.floor(Math.random() * (max - min + 1) + min)

}
