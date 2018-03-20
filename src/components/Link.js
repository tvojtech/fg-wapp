import React from 'react'
import { Link } from 'rebass'
import { Link as RouterLink } from "react-router-dom";

export default props => <Link is={RouterLink} {...props} />