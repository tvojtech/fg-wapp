import React from 'react';
import Promise from 'bluebird';
import _fp from 'lodash/fp';

const findMapFetchToProps = mapFetchToProps =>
  mapFetchToProps.mapFetchToProps && typeof mapFetchToProps.mapFetchToProps === 'function'
    ? mapFetchToProps.mapFetchToProps
    : mapFetchToProps;

export default _fp.curry(
  (mapFetchToProps, WrappedComponent) =>
    class WrapperComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data: undefined,
          error: undefined,
        };
        this.refetch = this.refetch.bind(this);
      }

      componentWillMount() {
        this.refetch(this.props);
      }

      componentWillReceiveProps(nextProps) {
        if (mapFetchToProps.shouldRefetch) {
          let shouldRefetch = mapFetchToProps.shouldRefetch(nextProps, this.props);
          if (shouldRefetch === false) {
            return;
          }
          if (shouldRefetch === true) {
            shouldRefetch = undefined;
          }
          this.refetch(nextProps, shouldRefetch);
        }
      }

      refetch(props, propNamesToRefetch) {
        if (propNamesToRefetch) {
          propNamesToRefetch = Array.isArray(propNamesToRefetch) ? propNamesToRefetch : [propNamesToRefetch];
        }
        this.setState({ loading: true, error: undefined });
        const mapped = findMapFetchToProps(mapFetchToProps)(props);
        const fetches = _fp.mapValues(
          fetchFn => (typeof fetchFn === 'function' ? fetchFn() : fetchFn),
          !propNamesToRefetch ? mapped : _fp.pick(propNamesToRefetch, mapped)
        );
        Promise.props(fetches)
          .then(data => this.setState(prev => ({ data: { ...prev.data, ...data }, error: undefined })))
          .catch(error => this.setState({ error, data: undefined }))
          .finally(() => this.setState({ loading: false }));
      }

      render() {
        const { loading, data, error } = this.state;
        let props = {
          ...this.props,
          refetch: (...params) => this.refetch(this.props, ...params),
          refetched: params => this.setState(prev => ({ data: { ...prev.data, ...params } })),
        };
        if (loading) {
          props = { ...props, loading, ...data };
        } else if (error) {
          props = { ...props, error, ...data };
        } else {
          props = { ...props, ...data };
        }
        return <WrappedComponent {...props} />;
      }
    }
);
