import React, {Component} from "react";
import "./form.css";
import Table from "../../tabel/tabel"
import SearchForm from "../../forms/search-form/search-form";
import {Pagination, PageItem, PageLink} from "mdbreact"

class ErrorList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pages: [],
            actualPageNumber: 1
        };
    }

    componentDidMount() {
        fetch('../data/issues-data.json')
            .then(response => response.json())
            .then(resp => {
                let data = resp;
                let pagesArr = this.splitDataToPages(data);

                this.setState({
                    data: resp,
                    pages: pagesArr
                })
            });
    }

    splitDataToPages(data) { // Split saved data to pages for condition - there is more data objects than 10
        if(!data || data < 11) return;
        let mappingIterator = -1; // iterator created to help designate index of new page (Array)
        let pageArray = [];

        data.map(dataItem => {
            if(data.indexOf(dataItem) % 10 === 0) { // With every 5th element create new Page/Array and push it to main Array with index of iterator
                mappingIterator++; 
                const newPage = [];
                pageArray.push(newPage);
                pageArray[mappingIterator].push(dataItem);
            } else {
                pageArray[mappingIterator].push(dataItem);
            }
        });

        return pageArray;
    };

    loadData() {
        let index = this.state.actualPageNumber - 1;
        return this.state.pages[index];
    }

    updatePage(indexValue) {
        this.setState({actualPageNumber: indexValue});
    }


    createPages() {
        return (
            <React.Fragment>
                {this.state.pages.map((page, index) => {
                    return (
                        <PageItem 
                            key={`pageItem-${index}`}
                            className={(this.state.actualPageNumber === index+1) ? "active" : ""}
                            onClick={this.updatePage.bind(this, index+1)}
                            >
                            <PageLink key={`pageLink-${index}`} className="page-link">
                                {index + 1}
                            </PageLink>
                        </PageItem>
                        )
                })}
            </React.Fragment>
        );
    };
    render() {
        return (
            <div>
                <h2 className="header">Zgłoszone błędy</h2>
                <SearchForm elements={["Imię", "Nazwisko", "Firma", "Nr tel.", "E-mail", "Nr sprawy"]}/>
                <Table 
                    headings = {["Nr zgloszenia", "Nr Klienta", "Firma", "Kategoria", "Oprogramowanie", "Data", "Stan"]} 
                    data = {this.loadData()}
                />
                <Pagination className="justify-content-center">
                    <PageItem disabled >
                        <PageLink className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        </PageLink>
                    </PageItem>
                    
                    {this.createPages()}
                    <PageItem>
                        <PageLink className="page-link">
                        &raquo;
                        </PageLink>
                    </PageItem>
                </Pagination>
            </div>
        );
    }

}

export default ErrorList;