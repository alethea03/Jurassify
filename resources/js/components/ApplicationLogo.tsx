import { SVGAttributes } from 'react';
import { GiDinosaurBones } from "react-icons/gi";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <GiDinosaurBones className="w-10 h-10 text-green-500" />
    );
}
