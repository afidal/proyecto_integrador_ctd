import React from "react";
import { Heading } from "../../atoms/Heading/Heading";
import { Paragraph } from "../../atoms/paragraph/Paragraph";
import classNames from "classnames";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import "./CardCategory.css";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export const CardCategory = ({ titulo, descripcion, url, id, toShow }) => {
  const CardCategoryClassnames = classNames("card-category", {
    "to-show": toShow,
  });
  return (
    
    <div className={CardCategoryClassnames}>
      <LazyLoadImage effect="blur" width={'100%'} src={url} alt={titulo}/>

      <div className="card-category-text">
        <Heading type="md" title="h3" variant="primary">
          {titulo}
        </Heading>
        <Paragraph size="md" variant="tertiary">
          {descripcion}
        </Paragraph>
      </div>
    </div>
    
    
  );
};
CardCategory.propTypes = {
  titulo: PropTypes.string,
  descripcion: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.number,
  toShow: PropTypes.bool,
};
CardCategory.defaultProps = {
  toShow: false,
};
