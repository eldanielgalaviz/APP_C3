import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { lib } from 'crypto-js';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ColorPicker } from 'primeng/colorpicker';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { Tooltip } from 'primeng/tooltip';

const AppTheme = definePreset(Aura, {
    components: {
        card: {
            colorScheme: {
                light: {
                    root: {
                        background: 'white',
                        color: "#5C5C5C",
                        title: {
                            fontSize: "16px",
                            fontWeight: "700",
                        },
                    },
                },
            }
        },
        button: {
            colorScheme: {
                light: {
                    root: {
                        primary: {
                            background: '#00946E',
                        },
                        secondary: {
                            background: '#3DB87B',
                            color: "white",

                            hover: {
                                background: '#00946E',
                                color: "white",
                            },
                            active: {
                                background: '#3DB87B',
                                color: "white",
                            }
                        },
                        success: {
                            background: '#21B6A8',
                            color: "white",

                            hover: {
                                background: '#51d3c6ff',
                                color: "white",
                            },
                            active: {
                                background: '#2FBCAE',
                                color: "white",
                            }
                        },
                        warn: {
                            background: '#D87610',
                        },
                        danger: {
                            background: '#D1410D',
                        },
                    },
                },
            }
        },
        floatlabel: {
            colorScheme: {
                light: {
                    root: {
                        color: '#5E6C84',
                        invalidColor: '#D1410D',
                        over: {
                            active: {
                                top: '-0.80rem',
                            }
                        }
                    }
                }
            }
        },
        inputtext: {
            colorScheme: {
                light: {
                    root: {
                        invalidBorderColor: '#D1410D',
                        invalidFocusBorderColor: '#D1410D',
                    },

                }
            }
        },
        select: {
            colorScheme: {
                light: {
                    root: {
                        invalidBorderColor: '#D1410D',
                        invalidFocusBorderColor: '#D1410D',
                    },

                }
            }
        },
        textarea: {
            colorScheme: {
                light: {
                    root: {
                        invalidBorderColor: '#D1410D',
                        invalidFocusBorderColor: '#D1410D',
                    },

                }
            }
        },
        breadcrumb: {
            colorScheme: {
                light: {
                    root: {
                        background: '#F8FAFB',
                        padding: '4px 50px',
                    },
                    item: {
                        color: '#5E6C84'
                    },
                    divider: {
                        color: '#5E6C84'
                    }
                }
            }
        },
        menu: {
            colorScheme: {
                light: {
                    root: {
                        background: 'transparent',

                        borderColor: '0px',
                        item: {
                            color: '#163029',
                      
                            focus: {
                                background: '#E3F0EA',
                            }
                        },
                        submenu: {
                            label: {
                                color: '#088F83',
                                fontSize: '10px',
                                fontWeight: '700',
                            }
                        },
                    }
                }
            }
        },
        drawer: {
            colorScheme: {
                light: {
                    root: {
                        color: '#163029',
                        header: {
                            padding: '10px',
                        },
                        content: {
                            padding: '0px 0px 10px 10px;',
                        },

                    },

                }
            }

        },
        tooltip: {
            colorScheme: {
                light: {
                    root: {
                        background: 'rgba(255, 255, 255, 0.7)',
                        color: "#163029",
                    },
                },
            }
        },
        message: {
            colorScheme: {
                light: {
                    root: {
                        borderColor: "none",
                        text: {
                            fontSize: '12px',
                        },
                        success: {
                            color: '#088F83',
                        },
                        warn: {
                            color: '#D87610',
                            background: '#f5d6b5',
                            borderColor: '#D87610',
                        },
                        error: {
                            color: '#D1410D',
                        },

                    }
                }
            }
        },
        menubar: {
            colorScheme: {
                light: {
                    root: {
                        padding: '16px 32px',
                        background: "#163029",
                        borderRadius: '0',
                        borderColor: 'none',
                        item: {
                            color: "#ffffff",
                            icon: {
                                color: "#999999",
                                focus: {
                                    color: "#00946E",
                                },
                            },
                            focus: {
                                background: "transparent",
                                color: '#ffffff',
                            }
                        },
                        submenu: {
                            background: "#F8FAFB",
                        },

                    },

                }
            }
        },
        divider: {
            colorScheme: {
                light: {
                    root: {
                        horizontal: {
                            margin: '4px',
                        }
                    }
                }
            }

        },
        dialog: {
            colorScheme: {
                light: {
                    root: {
                        header: {
                            padding: '16px 16px 0px 16px'
                        },
                        content: {
                            padding: '16px'
                        }
                    }
                }
            }
        },
        datepicker: {
            colorScheme: {
                light: {
                    root: {
                        with: '100% !important'
                    }
                }
            }
        },
        datatable: {
            colorScheme: {
                light: {
                    root: {
                        header: {
                            cell: {
                                background: " #F8FAFB",
                            }
                        }
                    }
                }
            }
        },
        tag: {
            colorScheme: {
                light: {
                    root: {
                        primary: {
                            background: '#ffffff00',
                            color: '#00946E'
                        },
                        secondary: {
                            background: '#ffffff00',
                            color: '#3DB87B'
                        },
                        success: {
                            background: '#ffffff00',
                            color: '#21B6A8'
                        },
                        info: {
                            background: '#ffffff00',
                            color: '#000'
                        },
                        warn: {
                            background: '#ffffff00',
                            color: '#D87610'
                        },
                        danger: {
                            background: '#ffffff00',
                            color: '#D1410D'
                        },
                        contrast: {
                            background: '#ffffff00',
                            color: '#000'
                        }

                    }
                }
            }
        },
        tabs: {
            colorScheme: {
                light: {
                    root: {
                        active: {
                            bar: {
                                background: "#3DB87B",
                                height: "3px",
                            }
                        },
                        tablist: {
                            background: "transparent",

                        },
                        tab: {
                            color: '#6B7280',
                            active: {
                                color: "#163029",
                            }
                        },
                        tabpanel: {
                            background: "transparent",
                        }
                    }
                }
            }

        }

    }
}

);

export default AppTheme