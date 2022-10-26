import logo from '../../utils/images/logo.svg'
import successbooking from '../../utils/images/successbooking.jpg'
import warning from "../../utils/images/warning.svg";
import qr_banco from "../../utils/images/qr_banco.jpeg";
import qr_mp from "../../utils/images/qr_mp.jpeg";
import qr_cripto from "../../utils/images/qr_cripto.png";
import price_tab from "../../utils/icons/price_tab.png";
import favoritos from "../../utils/icons/favoritos.png";
import reservas from "../../utils/icons/reservas.png";

const ImagesList = {
  logo: logo,
  successbooking: successbooking,
  warning: warning,
  qr_banco: qr_banco,
  qr_mp: qr_mp,
  qr_cripto: qr_cripto,
  price_tab: price_tab,
  favoritos: favoritos,
  reservas: reservas,
};
const ImageWidth = {
    xxs:'30px',
    xs: "71px",
    lg:'180px'
    // sm: "18px",
    // md: "22px",
    // lg: "25px",
};
const ImageHeight = {

    xs: '52px',
    lg:'180px'
//   sm: "18px",
//   md: "22px",
//   lg: "25px",
};
export const getImage = (image) => ImagesList[image];
export const getWidth=(width)=>ImageWidth[width];
export const getHeight = (heigth) => ImageHeight[heigth];

