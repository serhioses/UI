import React from 'react';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dd: null
        };
    }
    componentDidMount() {
        simpla.UI.Dropdown.hideOutside();

        this.setState({
            dd: new simpla.UI.Dropdown('dropdown', {
                trigger: 'dd-trigger',
                effect: 'slide',
                animationDuration: 300
            })
        }, () => {
            this.state.dd.init();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        var property = this.props.update.dropdown.property,
            value = this.props.update.dropdown.value,
            update = {};

        if (property !== undefined && value !== undefined) {
            update[property] = value;
            this.state.dd.reinit(update);
        }
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Dropdown</h1>
                    <h2 className="subtitle">Description</h2>
                    <div className="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus veniam, voluptatum voluptatibus sit maxime eveniet.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis necessitatibus explicabo non deserunt modi soluta sint corrupti consectetur!</p>
                    </div>
                    <h2 className="title title--small">Slide effect</h2>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h3 className="subtitle">Settings</h3>
                            <div className="settings">
                                <input id="hide-nested" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="dropdown" data-property="hideNested" data-property-type="boolean" />
                                <label className="checkbox" htmlFor="hide-nested">Hide nested</label>
                                <input id="hide-siblings" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="dropdown" data-property="hideSiblings" data-property-type="boolean" />
                                <label className="checkbox" htmlFor="hide-siblings">Hide siblings</label>
                                <h4 className="settings__title settings__title--location_inside">Animation duration</h4>
                                <input className="form-field" type="number" min="0" placeholder="Enter miliseconds" data-ui="dropdown" data-property="animationDuration" data-property-type="any" />
                                <h4 className="settings__title settings__title--location_inside">Callbacks</h4>
                                <div className="table">
                                    <div className="table-row">
                                        <div className="cell cell--top">
                                            <input id="before-open" className="none" type="checkbox" value="Before open" data-ui="dropdown" data-property="beforeOpen" data-property-type="function" />
                                            <label className="checkbox" htmlFor="before-open">Before open</label>
                                        </div>
                                        <div className="cell cell--top">
                                            <input id="after-open" className="none" type="checkbox" value="After open" data-ui="dropdown" data-property="afterOpen" data-property-type="function" />
                                            <label className="checkbox" htmlFor="after-open">After open</label>
                                        </div>
                                    </div>
                                    <div className="table-row">
                                        <div className="cell cell--top">
                                            <input id="before-close" className="none" type="checkbox" value="Before close" data-ui="dropdown" data-property="beforeClose" data-property-type="function" />
                                            <label className="checkbox" htmlFor="before-close">Before close</label>
                                        </div>
                                        <div className="cell cell--top">
                                            <input id="after-close" className="none" type="checkbox" value="After close" data-ui="dropdown" data-property="afterClose" data-property-type="function" />
                                            <label className="checkbox" htmlFor="after-close">After close</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h3 className="subtitle">Example</h3>
                            <div className="example">
                                <div id="dropdown">
                                    <ul className="categories">
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Компьютеры
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Ноутбуки
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Acer
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Asus
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        HP
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Домашний компьютер
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Artline
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Everest
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Lenovo
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        PricePC
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Бытовая техника
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Крупная техника
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Холодильники
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Плиты
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Стиральные машины
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Вытяжки
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="categories__category category category--level_2 dd-dropdown" data-level="2">
                                                        <span className="category__name category__name--level_2">
                                                            Кухня
                                                            <button className="category__trigger dd-trigger"></button>
                                                        </span>
                                                        <div className="category__drop category__drop--level_2 dd-drop">
                                                            <ul className="category__subcategories category__subcategories--level_2">
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Мультиварки
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Мясорубки
                                                                    </span>
                                                                </li>
                                                                <li className="categories__category category category--level_3">
                                                                    <span className="category__name category__name--level_3">
                                                                        Тостеры
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1 dd-dropdown" data-level="1">
                                            <span className="category__name category__name--level_1">
                                                Мебель
                                                <button className="category__trigger dd-trigger"></button>
                                            </span>
                                            <div className="category__drop category__drop--level_1 dd-drop">
                                                <ul className="category__subcategories category__subcategories--level_1">
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Столы
                                                        </span>
                                                    </li>
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Стулья
                                                        </span>
                                                    </li>
                                                    <li className="categories__category category category--level_2">
                                                        <span className="category__name category__name--level_2">
                                                            Шкафы
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="categories__category category category--level_1">
                                            <span className="category__name category__name--level_1">
                                                Спорт
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}