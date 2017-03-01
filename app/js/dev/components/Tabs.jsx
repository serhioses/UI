import React from 'react';
import simpla from 'simpla';
import 'simplaUI';
import UI from 'UI';

export default class Tabs extends UI {
    constructor(props) {
        super(props);

        this.tabs = [];
        this.indexes = null;
    }
    componentDidMount() {
        var tabs = [];

        tabs.push(new simpla.UI.AdaptiveTabs('tabs', {
            hideAjacentTabsMobile: true,
            hideAjacentTabsDesktop: true,
            toggleTabsDesktop: false,
            toggleTabsMobile: true,
            bindDesktopToMobile: true,
            bindMobileToDesktop: true
        }));

        this.tabs = tabs;

        this.tabs.forEach(function (item) {
            item.init();
        });
    }
    componentDidUpdate(prevProps, prevState) {
        this.handleUIUpdate('tabs', 'tabs', this.indexes);
    }
    componentWillUpdate(nextProps, nextState) {
        this.indexes = nextProps.update.tabs.indexes;
    }
    render() {
        return (
            <div className="content">
                <div className="container">
                    <h1 className="title">Tabs</h1>
                    <h2 className="subtitle">Описание</h2>
                    <div className="description">
                        <p>Данный виджет реализует возможность переключения между табами. При этом существует две версии данного виджета: "Статические табы" и "Адаптивные табы". Отличие их состоит в том, что для статических табов настройки постоянны на всех разрешениях экрана, а для адаптивных, возможны разные настройки для мобильной и десктопной версий за счёт дополнительной навигации.</p>
                        <p>В примере ниже, представлены только адаптивные табы, так как данный проект является адаптивным.</p>
                        <h3>Возможности:</h3>
                        <ul>
                            <li>Задание эффекта переключения (резко, затухание, слайд);</li>
                            <li>задание скорости анимации;</li>
                            <li>прокрутка до активного пункта навигации;</li>
                            <li>функции обратного вызова (до анимации и после);</li>
                            <li>скрытие соседних табов.</li>
                        </ul>
                    </div>
                    <h2 className="title title--small">Адаптивные табы</h2>
                    <div className="row clearfix">
                        <div className="col-md-6 right">
                            <h3 className="subtitle">Настройки</h3>
                            <div className="settings">
                                <input id="scroll-to-active-mobile" className="none" type="checkbox" value="1" defaultChecked={true} data-ui="tabs" data-property="scrollToActiveMobile" data-property-type="boolean" data-indexes="0" />
                                <label className="checkbox" htmlFor="scroll-to-active-mobile">Прокрутка до активной (моб.)</label>
                                <input id="scroll-to-active-desktop" className="none" type="checkbox" value="1" data-ui="tabs" data-property="scrollToActiveDesktop" data-property-type="boolean" data-indexes="0" />
                                <label className="checkbox" htmlFor="scroll-to-active-desktop">Прокрутка до активной (ПК)</label>
                                <label className="settings__title settings__title--location_inside" htmlFor="animation-duration-1">Время анимации (моб.)</label>
                                <input id="animation-duration-1" className="form-field" type="number" min="0" placeholder="Введите милисекунды" data-ui="tabs" data-property="mobileSpeed" data-property-type="any" data-indexes="0" />
                                <h4 className="settings__title settings__title--location_inside">Эффект (моб.)</h4>
                                <input id="effect-1" className="none" type="radio" name="effect-m" value="toggle" data-ui="tabs" data-property="mobileEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-1">Резко</label>
                                <input id="effect-2" className="none" type="radio" name="effect-m" value="fade" data-ui="tabs" data-property="mobileEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-2">Затухание</label>
                                <input id="effect-3" className="none" type="radio" name="effect-m" value="slide" defaultChecked={true} data-ui="tabs" data-property="mobileEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-3">Слайд</label>
                                <label className="settings__title settings__title--location_inside" htmlFor="animation-duration-2">Время анимации (ПК)</label>
                                <input id="animation-duration-2" className="form-field" type="number" min="0" placeholder="Введите милисекунды" data-ui="tabs" data-property="desktopSpeed" data-property-type="any" data-indexes="0" />
                                <h4 className="settings__title settings__title--location_inside">Эффект (ПК)</h4>
                                <input id="effect-4" className="none" type="radio" name="effect-d" value="toggle" defaultChecked={true} data-ui="tabs" data-property="desktopEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-4">Резко</label>
                                <input id="effect-5" className="none" type="radio" name="effect-d" value="fade" data-ui="tabs" data-property="desktopEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-5">Затухание</label>
                                <input id="effect-6" className="none" type="radio" name="effect-d" value="slide" data-ui="tabs" data-property="desktopEffect" data-property-type="any" data-indexes="0" />
                                <label className="radio" htmlFor="effect-6">Слайд</label>
                                <h4 className="settings__title settings__title--location_inside">Функции обратного вызова</h4>
                                <div className="table">
                                    <div className="table-row">
                                        <div className="cell cell--top">
                                            <input id="before-animation" className="none" type="checkbox" value="Перед анимацией" data-ui="tabs" data-property="beforeAnimation" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="before-animation">Перед анимацией</label>
                                        </div>
                                        <div className="cell cell--top">
                                            <input id="after-animation" className="none" type="checkbox" value="После анимации" data-ui="tabs" data-property="afterAnimation" data-property-type="function" data-indexes="0" />
                                            <label className="checkbox" htmlFor="after-animation">После анимации</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 left">
                            <h3 className="subtitle">Пример</h3>
                            <div className="example">
                                <div id="tabs" className="tabs" data-tabs>
                                    <div className="tabs__nav">
                                        <span className="tabs__link tabs__link--outer t-tab-nav-item t-tab-nav-item--desktop t-tab-nav-item--active t-tab-nav-item--active_desktop" data-tab="1">Видео</span>
                                        <span className="tabs__link tabs__link--outer t-tab-nav-item t-tab-nav-item--desktop" data-tab="2">Фото</span>
                                        <span className="tabs__link tabs__link--outer t-tab-nav-item t-tab-nav-item--desktop" data-tab="3">Книги</span>
                                    </div>
                                    <div className="tabs__content">
                                        <span className="tabs__link tabs__link--inner t-tab-nav-item t-tab-nav-item--mobile" data-tab="1">Видео</span>
                                        <div className="tabs__item t-tab-item t-tab-item--active_desktop" data-tab="1">
                                            <div className="tabs__inner">
                                                <div className="thumbs">
                                                    <div className="row">
                                                        <div className="col-sm-6 thumbs__item thumb">
                                                            <div className="thumb__inner">
                                                                <div className="thumb__preview">
                                                                    <iframe src="https://www.youtube.com/embed/B5WbSrorUyI" allowFullScreen></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 thumbs__item thumb">
                                                            <div className="thumb__inner">
                                                                <div className="thumb__preview">
                                                                    <iframe src="https://www.youtube.com/embed/sByGyM-O_ts" allowFullScreen></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 thumbs__item thumb">
                                                            <div className="thumb__inner">
                                                                <div className="thumb__preview">
                                                                    <iframe src="https://www.youtube.com/embed/QhJtaa-cCXg" allowFullScreen></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 thumbs__item thumb">
                                                            <div className="thumb__inner">
                                                                <div className="thumb__preview">
                                                                    <iframe src="https://www.youtube.com/embed/4sZK4Hd28VA" allowFullScreen></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="tabs__link tabs__link--inner t-tab-nav-item t-tab-nav-item--mobile" data-tab="2">Фото</span>
                                        <div className="tabs__item t-tab-item" data-tab="2">
                                            <div className="tabs__inner">
                                                <div className="thumbs">
                                                    <div className="row">
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="https://www.allaboutbirds.org/guide/PHOTO/LARGE/bald_eagle_adult2.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2015/03/02/16/eagle.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="https://s-media-cache-ak0.pinimg.com/736x/bd/9e/b0/bd9eb0b0607fd20554943b683a617819.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="http://www.theequinest.com/images/nick-sokoloff-3.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="tabs__link tabs__link--inner t-tab-nav-item t-tab-nav-item--mobile" data-tab="3">Книги</span>
                                        <div className="tabs__item t-tab-item" data-tab="3">
                                            <div className="tabs__inner">
                                                <div className="thumbs">
                                                    <div className="row">
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="https://i.ytimg.com/vi/CNYfcL0OpG4/hqdefault.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="http://moviemusicuk.files.wordpress.com/2010/11/lordoftherings3cover.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="http://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1424709588i/13794107._SX540_.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-mb-6 thumbs__item thumbs__item--small thumb">
                                                            <div className="thumb__inner image">
                                                                <div className="thumb__preview image__inner">
                                                                    <img src="http://pre09.deviantart.net/7454/th/pre/f/2014/215/3/6/fingolfin_and_morgoth_by_juliedillon-d7ti5jc.jpg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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