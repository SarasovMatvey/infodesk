import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
MySwal.mixin({
    timer: 3000,
});

export default MySwal;
