import React from 'react';
import eclipse from 'eclipse';
import 'eclipseUI';
import UI from 'UI';
import regionsApi from 'regions';

export default class Search extends UI {
    constructor(props) {
        super(props);

        this.state = {
            regions: ''
        };

        this.searches = [];
        this.indexes = null;
    }
    componentDidMount() {
        var searches = [],
            dd;

        eclipse.UI.Dropdown.hideOutside();
        dd = new eclipse.UI.Dropdown('search-dropdown', {
            trigger: 'dd-trigger'
        });
        dd.init();

        regionsApi.getRegions(2).then((res) => {
            var regions = res.response,
                list = [];

            regions.forEach((region) => {
                var div = <div className="select__item" data-q="true" key={region.region_id}>{region.title}</div>;
                list.push(div);
            });

            this.setState({
                regions: list
            }, () => {
                searches.push(new eclipse.UI.Search('search-dropdown'));

                this.searches = searches;

                this.searches.forEach((search) => {
                    search.init();
                });
            });
        });
    }
    render() {
        var regions = this.state.regions;

        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Search</h1>
                    <h2 className="subtitle">Описание</h2>
                    <div className="description">
                        <p>Данный виджет реализует возможность поиска по существующим елементам.</p>
                        <h3>Возможности:</h3>
                        <ul>
                            <li>Функция обратного вызова при каждом вводе символа.</li>
                        </ul>
                    </div>
                    <h2 className="title title--small">В действии</h2>
                    <h3 className="subtitle">Пример</h3>
                    <div className="example">
                        <div className="row">
                            <div className="col-sm-6">
                                <div id="search-dropdown" data-outside="true" data-other-dropdowns="true" data-dropdown data-search>
                                    <div className="select dd-dropdown" data-level="1">
                                        <div className="select__value dd-trigger">
                                            Области
                                        </div>
                                        <div className="select__drop dd-drop">
                                            <input className="select__search form-field s-field" type="text" placeholder="Поиск" />
                                            <div className="select__items">
                                                {regions}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}