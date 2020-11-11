import React from 'react';
import styles from './RoadMap.scss';
import classNames from 'classnames/bind';
import { AiOutlinePlus } from "react-icons/ai";


const cx = classNames.bind(styles);

const RoadMap = ({menubar}) => {

    let size = menubar ? "120px" : "0px";

    return (
        <div style={{marginLeft: size}} className={cx('roadmap-back')}>
            <div className={cx('roadmap-header')}>
                <div className={cx('roadmap-title-back')}>
                    <div className={cx('roadmap-title')}>작업명</div>
                    <div className={cx('roadmap-plusButton')}>
                        <AiOutlinePlus size="27" color="white"></AiOutlinePlus>
                    </div>
                </div>
                <div className={cx('roadmap-calendar-back')}>
                    <div className={cx('roadmap-calendar')}>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>
                        
                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>

                        <div title={"11month"} className={cx('roadmap-month')}>
                            <div className={cx('roadmap-N-month')}>11월</div>
                            <div title={"11month in day"} className={cx('roadmap-days')}>
                                <div className={cx('roadmap-day')}>1</div>
                                <div className={cx('roadmap-day')}>2</div>
                                <div className={cx('roadmap-day')}>3</div>
                                <div className={cx('roadmap-day')}>4</div>
                                <div className={cx('roadmap-day')}>5</div>
                                <div className={cx('roadmap-day')}>6</div>
                                <div className={cx('roadmap-day')}>7</div>
                                <div className={cx('roadmap-day')}>8</div>
                                <div className={cx('roadmap-day')}>9</div>
                                <div className={cx('roadmap-day')}>10</div>
                                <div className={cx('roadmap-day')}>11</div>
                                <div className={cx('roadmap-day')}>12</div>
                                <div className={cx('roadmap-day')}>13</div>
                                <div className={cx('roadmap-day')}>14</div>
                                <div className={cx('roadmap-day')}>15</div>
                                <div className={cx('roadmap-day')}>16</div>
                                <div className={cx('roadmap-day')}>17</div>
                                <div className={cx('roadmap-day')}>18</div>
                                <div className={cx('roadmap-day')}>19</div>
                                <div className={cx('roadmap-day')}>20</div>
                                <div className={cx('roadmap-day')}>21</div>
                                <div className={cx('roadmap-day')}>22</div>
                                <div className={cx('roadmap-day')}>23</div>
                                <div className={cx('roadmap-day')}>24</div>
                                <div className={cx('roadmap-day')}>25</div>
                                <div className={cx('roadmap-day')}>26</div>
                                <div className={cx('roadmap-day')}>27</div>
                                <div className={cx('roadmap-day')}>28</div>
                                <div className={cx('roadmap-day')}>29</div>
                                <div className={cx('roadmap-day')}>30</div>
                            </div>
                        </div>
                    
                    </div>
                </div>
             </div>

             <div className={cx('roadmap-main')}>
                <div className={cx('roadmap-text-list')}>
                    <div className={cx('roadmap-text')}>test</div>
                    <div className={cx('roadmap-text')}>test2</div>
                </div>
                
                <div className={cx('roadmap-schedule-back')}>
                    <div className={cx('roadmap-schedule-list')}>
                        <div className={cx('roadmap-schedule')}>
                            <div className={cx('roadmap-schedule-label')}>.</div>
                        </div>
                        <div className={cx('roadmap-schedule')}>
                            <div className={cx('roadmap-schedule-label')}>.</div>
                        </div>
                    </div>
                </div>

             </div>
        </div>
    );
}

export default RoadMap;