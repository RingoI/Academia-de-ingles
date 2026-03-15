export const formatearSueldo = (sueldo) => {
	return new Intl.NumberFormat("es-AR").format(sueldo);
};
